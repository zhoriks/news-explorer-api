const router = require('express').Router();
const routerArticles = require('./article');
const routerUsers = require('./user');
const NotFoundError = require('../errors/not-found-err');


router.use('/', routerArticles);
router.use('/', routerUsers);
router.use('/', () => {
  throw new NotFoundError('Ресурс не найден');
});

module.exports = router;
