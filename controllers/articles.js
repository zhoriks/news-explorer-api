const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');

module.exports.addArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({ article }))
    .catch(next);
};

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ articles }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Нет такой статьи');
      }
      if (req.user._id === article.owner.toString()) {
        Article.findByIdAndRemove(req.params.id)
          .then(() => res.send({ message: 'Удалено' }));
      } else {
        const err = new Error('Нет прав');
        err.statusCode = 403;
        next(err);
      }
    })
    .catch(next);
};
