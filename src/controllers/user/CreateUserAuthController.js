const createUserAuthService = require('../../services/user/CreateUserAuthService');
const UserAuthValidator = require('../../validators/user/UserAuthValidator');

module.exports = {
  async userAuth (req, res) {
    try {
      const { email, password } = req.body;

      const validatorAuth = await UserAuthValidator(req.body);
      if (validatorAuth.error) throw validatorAuth.error;

      const auth = await createUserAuthService(email, password);
      res.status(200).json({
        message: 'Authentication successful',
        auth
      });
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again!',
        message: error.message
      });
    }
  }
};
