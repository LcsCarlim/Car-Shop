const createUserService = require('../services/user/CreateUserService');
const createUserAuthService = require('../services/user/CreateUserAuthService');
const listAllInformationService = require('../services/user/ListAllInformationService');
const { tokenIsInListing, addTokenToListing } = require('../middlewares/TokenListingMiddleware');
const depositAmountService = require('../services/user/DepositAmountService');
const buyCarService = require('../services/user/BuyCarService');
const getUserSelfInfoService = require('../services/user/GetUserSelfInfoService');
const findUserByIdService = require('../services/user/FindUserByIdService');
const UserValidator = require('../validators/UserValidator');
const UserAuthValidator = require('../validators/UserAuthValidator');

module.exports = {
  async createUser (req, res) {
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
  },

  async createUserAuth (req, res) {
    try {
      const { email, password } = req.body;

      const validatorAuth = await UserAuthValidator(req.body);
      if (validatorAuth.error) throw validatorAuth.error;

      const usersAuth = await createUserAuthService({ email, password });

      res.status(200).json({
        message: 'Authentication successful',
        usersAuth
      });
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },
  async logout (req, res) {
    const token = req.headers.authorization.split(' ')[1];
    if (tokenIsInListing(token)) {
      return res.status(400).json({
        error: 'Token already invalidated'
      });
    }
    addTokenToListing(token);

    return res.status(200).json({
      message: 'Logout successful'
    });
  },
  async list (req, res) {
    const { role } = req.user;
    try {
      const users = await listAllInformationService({ role });
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },
  async depositAmount (req, res) {
    try {
      const { id } = req.user;
      const { balance } = req.body;
      const deposit = await depositAmountService(
        id,
        balance
      );
      res.status(200).json(deposit);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },
  async buyCar (req, res) {
    try {
      const { id } = req.user;
      const { CNPJ, carId } = req.params;
      const { balance } = req.body;

      const transfer = await buyCarService(
        id,
        CNPJ,
        balance,
        carId
      );
      res.status(200).json(transfer);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },
  async getUserSelf (req, res) {
    const { id } = req.user;
    try {
      const getUser = await getUserSelfInfoService(id);
      res.status(200).json(getUser);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },
  async findById (req, res) {
    const { id } = req.params;
    const { role } = req.user;
    try {
      const findId = await findUserByIdService(id, role);
      res.status(200).json(findId);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  }
};
