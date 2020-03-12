const router = require('express').Router();

const authRoutes = require('./auth-routes');
const userRoutes = require('./user-routes');
const articleRoutes = require('./article-routes');

router.use(authRoutes);
router.use(userRoutes);
router.use(articleRoutes);

module.exports = router;
