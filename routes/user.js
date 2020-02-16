const routerUsers = require('express').Router();
const auth = require('../middlewares/auth');

const { addUser, login, getUser } = require('../controllers/users');
const { validSignUp, validSignIn } = require('../celebrate-validation');


routerUsers.post('/signup', validSignUp, addUser);
routerUsers.post('/signin', validSignIn, login);
routerUsers.get('/users/me', auth, getUser);

module.exports = routerUsers;
