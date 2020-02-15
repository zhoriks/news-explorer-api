const routerArticles = require('express').Router();
const auth = require('../middlewares/auth');
const { addArticle, getArticles, deleteArticle } = require('../controllers/articles');
const { validCreateArticle } = require('../celebrate-validation');

routerArticles.post('/articles', validCreateArticle, auth, addArticle);
routerArticles.get('/articles', auth, getArticles);
routerArticles.delete('/articles/:articleId', auth, deleteArticle);

module.exports = routerArticles;
