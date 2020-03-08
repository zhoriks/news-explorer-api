const allowedDomains = [
  'https://www.news-explorer.online',
  'http://www.news-explorer.online',
  'https://news-explorer.online',
  'https://news-explorer.online',
  'http://localhost:8080',
];


const cors = (req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  next();
};

module.exports = cors;
