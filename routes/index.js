const router = require('express').Router();

const auth = require('../middlewares/auth');

const { addUser, login, getUser } = require('../controllers/users');
const { addArticle, getArticles, deleteArticle } = require('../controllers/articles');
const { validSignUp, validSignIn, validCreateArticle } = require('../celebrate-validation');

router.post('/signup', validSignUp, addUser);
router.post('/signin', validSignIn, login);

router.post('/articles', validCreateArticle, auth, addArticle);

router.get('/articles', auth, getArticles);

router.delete('/articles/:articleId', auth, deleteArticle);

router.get('/users/me', auth, getUser);

module.exports = router;
