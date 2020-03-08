const { celebrate, Joi } = require('celebrate');

const { uriRegExp, mongoIdRegExp } = require('../shared/regular-expression');

const createArticleValidator = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.date().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(uriRegExp),
    image: Joi.string().required().pattern(uriRegExp),
  }),
});

const deleteArticleValidator = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().pattern(mongoIdRegExp),
  }),
});

module.exports = {
  createArticleValidator,
  deleteArticleValidator,
};
