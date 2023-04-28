const { Router } = require('express');
const routes = Router();

const EnterpriseController = require('../controller/EnterpriseController');
const userAuth = require('../middlewares/CheckTokenMiddleware');

routes.post('/',
  userAuth,
  EnterpriseController.createEnterprise
);
routes.post('/login',
  EnterpriseController.enterpriseAuth
);

module.exports = routes;
