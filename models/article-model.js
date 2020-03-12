const mongoose = require('mongoose');
const validator = require('validator');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const { uriRegExp } = require('../shared/regular-expression');
const {
  articleLinkErrorMessage,
  articleImageErrorMessage,
  articleNotFoundMessage,
  articleForbiddenMessage,
} = require('../shared/messages');

const validateLink = (link) => {
  validator.isURL(link);
};
const validateImage = (image) => {
  image.match(uriRegExp);
};

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
  },
  date: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: [validateLink, articleLinkErrorMessage],
  },
  image: {
    type: String,
    required: true,
    validate: [validateImage, articleImageErrorMessage],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

articleSchema.statics.removeIfIsOwner = function (owner, articleId) {
  return this.findById(articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        return Promise.reject(new NotFoundError(articleNotFoundMessage));
      }

      if (article.owner._id.toString() === owner) {
        return article.remove();
      }

      return Promise.reject(new ForbiddenError(articleForbiddenMessage));
    });
};

module.exports = mongoose.model('article', articleSchema);
