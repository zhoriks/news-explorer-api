const { allowedDomains } = require('../config');

const cors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedDomains.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};

module.exports = cors;
