const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  jwtSecret: isDev ? 'big-secret-for-a-small-company' : process.env.JWT_SECRET,
  appPort: isDev ? 3000 : process.env.PORT,
};
