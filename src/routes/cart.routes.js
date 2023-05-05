const { Router } = require('express');
const routes = Router();

const userAuth = require('../middlewares/CheckTokenMiddleware');
const CartController = require('../controller/CartController');

routes.post('/:carId',
  userAuth,
  CartController.create
);

routes.get('/self',
  userAuth,
  CartController.get
);

module.exports = routes;
