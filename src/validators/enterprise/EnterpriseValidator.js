const Joi = require('joi');

module.exports = async body => {
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
    return await schema.validateAsync(body);
  } catch (error) {
    return error;
  }
};
