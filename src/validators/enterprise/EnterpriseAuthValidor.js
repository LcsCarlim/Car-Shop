const Joi = require('joi');

module.exports = async body => {
  const schema = Joi.object({
    CNPJ: Joi.string()
      .required(),
    commercial_phone: Joi.string()
      .required()
      .min(11)
  });
  try {
    return await schema.validateAsync(body);
  } catch (error) {
    return error;
  }
};
