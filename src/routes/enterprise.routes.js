const { Router } = require('express');
const routes = Router();

const EnterpriseController = require('../controller/EnterpriseController');
const userAuth = require('../middlewares/CheckTokenMiddleware');
const userLogout = require('../middlewares/LogoutMiddleware');

routes.post('/',
  userAuth,
  EnterpriseController.createEnterprise
);
routes.post('/login',
  EnterpriseController.enterpriseAuth
);

routes.post('/logout',
  userLogout,
  EnterpriseController.logout
);

routes.get('/get',
  userAuth,
  EnterpriseController.getEnterprises
);

routes.get('/:id',
  userAuth,
  EnterpriseController.findById
);
module.exports = routes;
