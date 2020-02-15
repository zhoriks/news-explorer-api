const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require('../errors/not-found-err');
const AuthorisationError = require('../errors/authorisation-error');
const BadReques = require('../errors/bad-reques');


module.exports.addUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => {
      if (!user) {
        throw new BadReques('Ошибка создания пользователя');
      }
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthorisationError('Ошибка авторизации');
      }
      res.send({
        token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' }),
      });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      } else {
        res.send({ user });
      }
    })
    .catch(next);
};
