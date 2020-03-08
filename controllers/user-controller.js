const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');
const NotFoundError = require('../errors/not-found-err');
const { userNotFoundMessage, userCreateSuccessMessage } = require('../shared/messages');
const User = require('../models/user-model');

const createUser = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const hash = await bcrypt.hash(password.trim(), 10);

    await User.create({
      email: email.trim(),
      password: hash,
      name: name.trim(),
    });

    res.status(201).send({ message: userCreateSuccessMessage });
  } catch (err) {
    next(err);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 1000 * 60 * 60 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt').end();
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundMessage);
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports = {
  createUser, login, getCurrentUser, logout,
};
