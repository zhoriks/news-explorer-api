const rateLimit = require('express-rate-limit');

const { rateLimitErrorMessage } = require('../shared/messages');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: rateLimitErrorMessage,
});

module.exports = rateLimiter;
