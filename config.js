const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  jwtSecret: isDev ? 'big-secret-for-a-small-company' : process.env.JWT_SECRET,
  appPort: isDev ? 3000 : process.env.PORT,
  mongoUri: isDev ? 'mongodb://localhost:27017/newsdb' : process.env.MONGO_URI,
  allowedDomains: [
    'https://www.news-explorer.online',
    'http://www.news-explorer.online',
    'https://news-explorer.online',
    'https://news-explorer.online',
    'http://localhost:8080',
  ],
};
