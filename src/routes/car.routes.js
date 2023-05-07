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
  CreateCarController.createCar
);

routes.delete('/delete/:id',
  userAuth,
  DeleteAnnouncementController.deleteAnnouncement);

routes.get('/details/:id',
  DetailsController.details
);

routes.get('/:company_name',
  FindAnnouncementByNameController.findAnnouncementByName
);

routes.get('/status/available/:status',
  FindStatusAvailableController.findStatusAvailable
);

routes.get('/status/sold/:status',
  FindStatusSoldController.findStatusSold
);

routes.get('/',
  ListAnnouncementController.listAnnouncement
);

module.exports = routes;
