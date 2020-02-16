const Article = require('../models/article');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/not-found-err');

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
  const owner = req.user._id;
  const { articleId } = req.params;
  Article.findById(articleId)
    .then((article) => {
      if (article) {
        if (owner === article.owner.toString()) {
          Article.findByIdAndRemove(articleId)
            .then(() => {
              res.send({ message: 'Статья удалена' });
            })
            .catch(next);
        } else {
          throw new ForbiddenError('Недостаточно прав');
        }
      } else {
        throw new NotFoundError('Такой статьи не существует');
      }
    })
    .catch(next);
};
