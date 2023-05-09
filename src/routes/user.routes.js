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
const GetUserSelfInfoController = require('../controllers/user/GetUserSelfInfoController');

routes.post('/buycar/:CNPJ/:carId',
  userAuth,
  BuyCarController
);

routes.post('/auth',
  CreateUserAuthController
);

routes.post('/register',
  CreateUserController
);

routes.post('/deposit/:id',
  userAuth,
  DepositAmountController
);

routes.get('/find/:id',
  userAuth,
  FindUserByIdController
);

routes.get('/selfinfo',
  userAuth,
  GetUserSelfInfoController
);

routes.get('/getself',
  userAuth,
  GetUserCartController
);

routes.get('/info',
  userAuth,
  ListUserController
);

routes.post('/logout',
  userLogout,
  LogoutUserController
);

module.exports = routes;
