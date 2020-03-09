
require('dotenv').config();
require('./mongod');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const { appPort } = require('./config');
const NotFoundError = require('./errors/not-found-err');
const errorHandler = require('./middlewares/error-handler');
const rateLimiter = require('./middlewares/rate-limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const { notFoundMessage } = require('./shared/messages');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080/',
  optionsSuccessStatus: 200,
};


app.use(rateLimiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use('/', cors(corsOptions), routes);
app.use(errorLogger);
app.use(() => {
  throw new NotFoundError(notFoundMessage);
});
app.use(errors());
app.use(errorHandler);

app.listen(appPort, () => {
  console.log(`App: OK on port ${appPort}`);
});
