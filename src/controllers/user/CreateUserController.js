const createUserService = require('../../services/user/CreateUserService');
const UserValidator = require('../../validators/user/UserValidator');

module.exports = async (req, res) => {
  try {
    const { name, last_name, email, password, confirm_password, phone_number, cep, role } = req.body;

    const validator = await UserValidator(req.body);
    if (validator.error) throw validator.error;

    const users = await createUserService({
      name,
      last_name,
      email,
      password,
      confirm_password,
      phone_number,
      cep,
      role
    });

    return res.status(201).json(users);
  } catch (error) {
    return res.status(400).json({
      error: 'Registration failed',
      message: error.message
    });
  }
};
