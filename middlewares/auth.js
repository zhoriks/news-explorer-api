const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized-err');
const { tokenNotFoundMessage, unauthorizedMessage } = require('../shared/messages');

const getAuth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  try {
    if (!token) {
      throw new UnauthorizedError(tokenNotFoundMessage);
    }

    req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    next();
  } catch (err) {
    throw new UnauthorizedError(unauthorizedMessage);
  }
};

module.exports = {
  getAuth,
};
