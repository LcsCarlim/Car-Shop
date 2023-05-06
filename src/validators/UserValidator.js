const Joi = require('joi');

module.exports = async body => {
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
    cep: Joi.string()
      .required()
  });
  try {
    await schema.validateAsync(body);
  } catch (error) {
    return error;
  }
};
