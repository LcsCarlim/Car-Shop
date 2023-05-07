const { Router } = require('express');
const routes = Router();

const userAuth = require('../middlewares/CheckTokenMiddleware');
const userLogout = require('../middlewares/LogoutMiddleware');
const CreateEnterpriseController = require('../controllers/enterprise/CreateEnterpriseController');
const EnterpriseAuthController = require('../controllers/enterprise/EnterpriseAuthController');
const FindEnterpriseByIdController = require('../controllers/enterprise/FindEnterpriseByIdController');
const ListEnterpriseController = require('../controllers/enterprise/ListEnterpriseController');
const LogoutEnterpriseController = require('../controllers/enterprise/LogoutEnterpriseController');

routes.post('/',
  userAuth,
  CreateEnterpriseController.createEnterprise
);
routes.post('/login',
  EnterpriseAuthController.enterpriseAuth
);

routes.get('/:id',
  userAuth,
  FindEnterpriseByIdController.findEnterprise
);

routes.get('/get',
  userAuth,
  ListEnterpriseController.listEnterprise
);

routes.post('/logout',
  userLogout,
  LogoutEnterpriseController.logout
);

module.exports = routes;
