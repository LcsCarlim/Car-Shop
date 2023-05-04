const Joi = require('joi');

const createUserService = require('../services/User/CreateUserService');
const createUserAuthService = require('../services/User/CreateUserAuthService');
const listAllInformationService = require('../services/User/ListAllInformationService');
const { tokenIsInListing, addTokenToListing } = require('../middlewares/TokenListingMiddleware');
const depositAmountService = require('../services/User/DepositAmountService');
const buyCarService = require('../services/User/BuyCarService');
const getUserSelfInfoService = require('../services/User/GetUserSelfInfoService');
const findUserByIdService = require('../services/User/FindUserByIdService');

module.exports = {
  async createUser (req, res) {
    const { name, last_name, email, password, confirm_password, phone_number, address, role } = req.body;

    const schema = Joi.object({
      name: Joi.string()
        .required(),
      last_name: Joi.string()
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(6),
      confirm_password: Joi.string()
        .required()
        .min(6),
      phone_number: Joi.string()
        .min(11)
        .required(),
      address: Joi.string()
        .required()
    });

    try {
      await schema.validateAsync(req.body);

      const users = await createUserService({
        name,
        last_name,
        email,
        password,
        confirm_password,
        phone_number,
        address,
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
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string()
        .email(),
      password: Joi.string()
        .required()
        .min(6)
    });

    try {
      await schema.validateAsync(req.body);

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
