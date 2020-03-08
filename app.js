
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
const rateLimiter = require('./middlewares/rate-limiter');
const cors = require('./middlewares/cors');
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

app.use(cors);
app.use(rateLimiter);
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
