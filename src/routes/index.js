const { Router } = require('express');
const routes = Router();

const userRoutes = require('../routes/user.routes');
const enterpriseRoutes = require('./enterprise.routes');
const documentRoutes = require('../routes/document.routes');
const carsRoutes = require('../routes/car.routes');
const cartRoutes = require('../routes/cart.routes');

routes.use('/users',
  userRoutes
);
routes.use('/enterprise',
  enterpriseRoutes
);
routes.use('/documents',
  documentRoutes
);
routes.use('/cars',
  carsRoutes
);

routes.use('/cart',
  cartRoutes
);
module.exports = routes;
