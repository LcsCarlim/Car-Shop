const { Router } = require('express');
const routes = Router();

const userAuth = require('../middlewares/CheckTokenMiddleware');
const CartController = require('../controller/CartController');

routes.post('/:carId',
  userAuth,
  CartController.post
);

// routes.update('/:carId',
//   userAuth,
//   CartController
// );

module.exports = routes;
