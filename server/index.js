require('dotenv/config');
const pg = require('pg');
const path = require('path');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
} else {
  app.use(express.static(publicPath));
}

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.get('/api/users/:region', (req, res, next) => {
  const region = req.params.region;
  const sql = `
    select "r"."rankId" as "rank",
            "u"."userId" as user,
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
