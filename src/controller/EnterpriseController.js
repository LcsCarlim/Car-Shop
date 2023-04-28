const createEnterpriseService = require('../services/Enterprise/CreateEnterpriseService');
const enterpriseAuthService = require('../services/Enterprise/EnterpriseAuthService');
const Joi = require('joi');

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
  }
};
