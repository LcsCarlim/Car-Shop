const createUserAuthService = require('../../services/user/CreateUserAuthService');
const UserAuthValidator = require('../../validators/user/UserAuthValidator');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validator = await UserAuthValidator(req.body);
    if (validator.error) throw validator.error;

    const usersAuth = await createUserAuthService({ email, password });

    res.status(200).json({
      message: 'Authentication successful',
      usersAuth
    });
  } catch (error) {
    res.status(400).json({
      error: 'Something wrong happened, try again!',
      message: error.message
    });
  }
};
