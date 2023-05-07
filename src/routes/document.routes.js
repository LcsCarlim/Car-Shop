const { Router } = require('express');
const routes = Router();
const multer = require('multer');

const documentMulterConfig = require('../config/DocumentMulterConfig');
const userAuth = require('../middlewares/CheckTokenMiddleware');
const CreateDocumentController = require('../controllers/document/CreateDocumentController');

routes.post('/upload',
  multer(documentMulterConfig).single('filename'),
  userAuth,
  CreateDocumentController.createDocument
);

module.exports = routes;
