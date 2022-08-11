require('dotenv/config');
const pg = require('pg');
const path = require('path');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const argon2 = require('argon2');
const authorizationMiddleware = require('./authorization-middleware');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const uploadsMiddleware = require('./uploads-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

const jsonMiddleware = express.json();

app.use(express.static(publicPath));
app.use(jsonMiddleware);

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
} else {
  app.use(express.static(publicPath));
}

app.post('/api/uploads', uploadsMiddleware, (req, res, next) => {
  console.log('req.file:', req.file); // https://www.npmjs.com/package/multer-s3#file-information
  const fileUrl = req.file.location; // The S3 url to access the uploaded file later
  res.end(); // this is just here so my request doesn't hang
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'an unexpected error occurred (check the server terminal)'
  });
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password, region, timeAvailable } = req.body;
  if (!username || !password || !region || !timeAvailable) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
      insert into "Users" ("username", "hashedPassword", "regionId", "timeAvailable")
      values ($1, $2, $3, $4)
      returning "userId", "username"
  `;
      const params = [username, hashedPassword, region, timeAvailable];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "Users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid user login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

/* ⛔ Every route after this middleware requires a token! ⛔ */

app.use(authorizationMiddleware);

app.get('/api/users/:region', (req, res, next) => {
  const region = req.params.region;
  const sql = `
    select "r"."rankId" as "rank",
            "u"."userId" as userId,
            "u"."regionId" as "region",
            "c"."rankName" as "name"
      from "userRanks" as "r"
      join "Users" as "u" using ("userId")
      join "regionID" using ("regionId")
      join "clientRanks" as "c" using ("rankId")
      where "regionName" = $1
  `;
  const params = [region];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        throw new ClientError(200, 'no users found');
      }
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/stats/:appid/:steamid', (req, res, next) => {
  const { appid, steamid } = req.params;
  fetch(
    `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${process.env.STEAM_KEY}&steamid=${steamid}`
  )
    .then(fetchRes => fetchRes.json())
    .then(profile => res.json(profile))
    .catch(err => next(err));
});

app.post('/api/ranks/:mm/:faceit/:user', (req, res, next) => {
  const { mm, faceit, user } = req.params;
  const sql = `
    insert into "userRanks" ("userId", "clientId", "rankId")
values ($1, 1, $2),
       ($1, 2, $3)
  `;
  const params = [user, mm, faceit];
  db.query(sql, params)
    .then(result => res.status(201).json(result))
    .catch(err => next(err));
});

app.get('/api/ranks/load/:user', (req, res, next) => {
  const { user } = req.params;
  const sql = `
    select *
    from "userRanks"
    where "userId" = $1
  `;
  const params = [user];
  db.query(sql, params)
    .then(result => {
      if (!result.rows) {
        throw new ClientError(404, 'not found');
      }
      res.status(200).json(result);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
