const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/unauthorized-err');
const { userEmailErrorMessage, wrongLoginMessage } = require('../shared/messages');

const validateEmail = (email) => {
  validator.isEmail(email);
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [validateEmail, userEmailErrorMessage],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(wrongLoginMessage));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(wrongLoginMessage));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
