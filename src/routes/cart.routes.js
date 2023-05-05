const { Router } = require('express');
const routes = Router();

const userAuth = require('../middlewares/CheckTokenMiddleware');
const CartController = require('../controller/CartController');

routes.post('/:carId',
  userAuth,
  CartController.post
);

routes.get('/self',
  userAuth,
  CartController.self
);

module.exports = routes;
