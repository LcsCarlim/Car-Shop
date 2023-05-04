const createEnterpriseService = require('../services/Enterprise/CreateEnterpriseService');
const enterpriseAuthService = require('../services/Enterprise/EnterpriseAuthService');
const { tokenIsInListing, addTokenToListing } = require('../middlewares/TokenListingMiddleware');
const Joi = require('joi');
const getEnterprisesService = require('../services/Enterprise/GetEnterprisesService');
const findEnterpriseByIdService = require('../services/Enterprise/FindEnterpriseByIdService');

module.exports = {
  async createEnterprise (req, res) {
    const { id, role } = req.user;
    const { company_name, CNPJ, address, commercial_phone } = req.body;

    const schema = Joi.object({
      company_name: Joi.string()
        .trim()
        .regex(/^[^\s]+( [^\s]+)*$/)
        .required(),
      CNPJ: Joi.string()
        .required()
        .min(14),
      address: Joi.string()
        .required(),
      commercial_phone: Joi.string()
        .required()
    });

    try {
      await schema.validateAsync({
        company_name,
        CNPJ,
        address,
        commercial_phone
      });

      const enterprises = await createEnterpriseService(
        {
          role,
          user_id: id,
          company_name,
          CNPJ,
          address,
          commercial_phone
        }
      );

      return res.json(enterprises);
    } catch (error) {
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },
  async enterpriseAuth (req, res) {
    const { CNPJ, commercial_phone } = req.body;

    const schema = Joi.object({
      CNPJ: Joi.string()
        .required(),
      commercial_phone: Joi.string()
        .required()
        .min(11)
    });

    try {
      await schema.validateAsync({
        CNPJ,
        commercial_phone
      });

      const enterpriseAuth = await enterpriseAuthService(CNPJ, commercial_phone);

      res.status(200).json({
        message: 'Authentication successful',
        enterpriseAuth
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
  async getEnterprises (req, res) {
    const { role } = req.user;
    try {
      const enterprises = await getEnterprisesService(role);
      res.status(200).json(enterprises);
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
      const enterpriseId = await findEnterpriseByIdService(id, role);
      res.status(200).json(enterpriseId);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  }
};
