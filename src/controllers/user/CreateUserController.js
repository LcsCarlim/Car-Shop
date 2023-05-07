const CreateUserService = require('../../services/user/CreateUserService');
const UserValidator = require('../../validators/user/UserValidator');

module.exports = {
  async createUser (req, res) {
    try {
      const { name, last_name, email, password, confirm_password, phone_number, cep, role } = req.body;

      const validator = await UserValidator(req.body);
      if (validator.error) throw validator.error;

      const user = CreateUserService({
        name,
        last_name,
        email,
        password,
        confirm_password,
        phone_number,
        cep,
        role
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({
        error: 'Registration failed!',
        message: error.message
      });
    }
  }
};
