const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  jwtSecret: isDev ? 'big-secret-for-a-small-company' : process.env.JWT_SECRET,
  appPort: isDev ? 3000 : process.env.PORT,
  allowedDomains: [
    'https://www.news-explorer.online',
    'http://www.news-explorer.online',
    'https://news-explorer.online',
    'https://news-explorer.online',
    'http://localhost:8080',
  ],
};
