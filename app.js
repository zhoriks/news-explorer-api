/* eslint-disable prefer-template */
require('dotenv').config();
require('./mongod');
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index.js');

const { NODE_ENV, MONGO_URL } = process.env;
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(requestLogger);

app.use('/', router);


app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {

  const { statusCode = 500, message } = err;

  res
      .status(statusCode)
      .send({
          message: statusCode === 500
              ? 'На сервере произошла ошибка'
              : message
      });
});


app.listen(PORT, () => {});
