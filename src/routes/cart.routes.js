const { Router } = require('express');
const routes = Router();

const userAuth = require('../middlewares/CheckTokenMiddleware');
const CreateUserCartController = require('../controllers/cart/CreateUserCartController');
const GetUserCartController = require('../controllers/cart/GetUserCartController');

routes.post('/:carId',
  userAuth,
  CreateUserCartController.createCart
);

routes.get('/self',
  userAuth,
  GetUserCartController.getCart
);

module.exports = routes;
