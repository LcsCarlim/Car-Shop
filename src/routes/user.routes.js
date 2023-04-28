const { Router } = require('express');
const routes = Router();

const UserController = require('../controller/UserController');
const userLogout = require('../middlewares/LogoutMiddleware');
const userAuth = require('../middlewares/CheckTokenMiddleware');

routes.post('/register',
  UserController.createUser);

routes.post('/auth',
  UserController.createUserAuth
);

routes.post('/logout',
  userLogout,
  UserController.logout
);

routes.get('/info',
  userAuth,
  UserController.list
);

routes.post('/deposit',
  userAuth,
  UserController.depositAmount
);
module.exports = routes;
