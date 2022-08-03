const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

function authorizationMiddleware(req, res, next) {
  try {
    const token = req.get('x-access-token');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    throw new ClientError(401, 'authentication required');
  }
}

module.exports = authorizationMiddleware;
