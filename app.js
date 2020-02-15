/* eslint-disable prefer-template */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index.js');

const NotFoundError = require('./errors/not-found-err');

const { NODE_ENV, MONGO_URL } = process.env;
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/newdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use('/', router);
app.use('/', () => {
  throw new NotFoundError('Ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
  next();
});


app.listen(PORT, () => {});
