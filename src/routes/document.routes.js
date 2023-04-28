const { Router } = require('express');
const routes = Router();
const multer = require('multer');

const documentMulterConfig = require('../config/DocumentMulterConfig');
const DocumentController = require('../controller/DocumentController');
const userAuth = require('../middlewares/CheckTokenMiddleware');

routes.post('/upload',
  multer(documentMulterConfig).single('filename'),
  userAuth,
  DocumentController.upload
);

module.exports = routes;
