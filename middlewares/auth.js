const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');
const UnauthorizedError = require('../errors/unauthorized-err');
const { tokenNotFoundMessage, unauthorizedMessage } = require('../shared/messages');

const getAuth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  try {
    if (!token) {
      throw new UnauthorizedError(tokenNotFoundMessage);
    }

    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch (err) {
    throw new UnauthorizedError(unauthorizedMessage);
  }
};

module.exports = {
  getAuth,
};
