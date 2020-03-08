
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { appPort, mongoUri } = require('./config');
const NotFoundError = require('./errors/not-found-err');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const { notFoundMessage } = require('./shared/messages');

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Mongo: OK');
  });

const app = express();

const allowedCors = [
  'https://www.news-explorer.online',
  'http://www.news-explorer.online',
  'https://news-explorer.online',
  'https://news-explorer.online',
  'http://localhost:8080',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use('/', routes);
app.use(errorLogger);
app.use(() => {
  throw new NotFoundError(notFoundMessage);
});
app.use(errors());
app.use(errorHandler);

app.listen(appPort, () => {
  console.log(`App: OK on port ${appPort}`);
});
