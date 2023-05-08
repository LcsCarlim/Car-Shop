const { Router } = require('express');
const routes = Router();
const multer = require('multer');

const carMulterConfig = require('../config/CarMulterConfig');
const enterpriseAuth = require('../middlewares/CheckTokenEnterpriseMiddleware');
const userAuth = require('../middlewares/CheckTokenMiddleware');
const CreateCarController = require('../controllers/car/CreateCarController');
const DeleteAnnouncementController = require('../controllers/car/DeleteAnnouncementController');
const DetailsController = require('../controllers/car/DetailsController');
const FindAnnouncementByNameController = require('../controllers/car/FindAnnouncementByNameController');
const FindStatusAvailableController = require('../controllers/car/FindStatusAvailableController');
const FindStatusSoldController = require('../controllers/car/FindStatusSoldController');
const ListAnnouncementController = require('../controllers/car/ListAnnouncementController');

routes.post('/createcar',
  multer(carMulterConfig).single('filename'),
  enterpriseAuth,
  CreateCarController
);

routes.delete('/delete/:id',
  userAuth,
  DeleteAnnouncementController
);

routes.get('/details/:id',
  DetailsController
);

routes.get('/:company_name',
  FindAnnouncementByNameController
);

routes.get('/status/available/:status',
  FindStatusAvailableController
);

routes.get('/status/sold/:status',
  FindStatusSoldController
);

routes.get('/',
  ListAnnouncementController
);

module.exports = routes;
