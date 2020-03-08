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
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization',
  );
  next();
});

module.exports = corsControl;
