const { Router } = require('express');
const routes = Router();
const multer = require('multer');

const carMulterConfig = require('../config/CarMulterConfig');
const CarController = require('../controller/CarController');
const enterpriseAuth = require('../middlewares/CheckTokenEnterpriseMiddleware');
const userAuth = require('../middlewares/CheckTokenMiddleware');

routes.post('/createcar',
  multer(carMulterConfig).single('filename'),
  enterpriseAuth,
  CarController.createCar
);

routes.get('/',
  CarController.list
);

routes.get('/:company_name',
  CarController.getEnterprise
);

routes.get('/details/:id',
  CarController.details
);

routes.delete('/delete/:id',
  userAuth,
  CarController.delete);

routes.get('/status/available/:status',
  CarController.findStatusAvailable
);

routes.get('/status/sold/:status',
  CarController.findStatusSold
);

module.exports = routes;
