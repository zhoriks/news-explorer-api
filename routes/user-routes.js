const router = require('express').Router();

const { getAuth } = require('../middlewares/auth');
const { getCurrentUser } = require('../controllers/user-controller');

router.get('/users/me', getAuth, getCurrentUser);

module.exports = router;
