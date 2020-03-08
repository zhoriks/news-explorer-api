const corsControl = require('express').Router();

// Массив разешённых доменов
const allowedCors = [
  'https://www.news-explorer.online',
  'http://www.news-explorer.online',
  'https://news-explorer.online',
  'https://news-explorer.online',
  'http://localhost:8080',
];

corsControl.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

module.exports = corsControl;
