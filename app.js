
require('dotenv').config();
require('./mongod');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const NotFoundError = require('./errors/not-found-err');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const { notFoundMessage } = require('./shared/messages');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors);

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

app.listen(PORT, () => {});
