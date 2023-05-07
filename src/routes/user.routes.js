const { Router } = require('express');
const routes = Router();

const userLogout = require('../middlewares/LogoutMiddleware');
const userAuth = require('../middlewares/CheckTokenMiddleware');
const BuyCarController = require('../controllers/user/BuyCarController');
const CreateUserAuthController = require('../controllers/user/CreateUserAuthController');
const CreateUserController = require('../controllers/user/CreateUserController');
const DepositAmountController = require('../controllers/user/DepositAmountController');
const FindUserByIdController = require('../controllers/user/FindUserByIdController');
const GetUserCartController = require('../controllers/cart/GetUserCartController');
const ListUserController = require('../controllers/user/ListUserController');
const LogoutUserController = require('../controllers/user/LogoutUserController');

routes.post('/buycar/:CNPJ/:carId',
  userAuth,
  BuyCarController.buyCar
);

routes.post('/auth',
  CreateUserAuthController.userAuth
);

routes.post('/register',
  CreateUserController.createUser
);

routes.post('/deposit',
  userAuth,
  DepositAmountController.depositAmount
);

routes.get('/:id',
  userAuth,
  FindUserByIdController.findById
);

routes.get('/getself',
  userAuth,
  GetUserCartController.getCart
);

routes.get('/info',
  userAuth,
  ListUserController.list
);

routes.post('/logout',
  userLogout,
  LogoutUserController.logout
);

module.exports = routes;
