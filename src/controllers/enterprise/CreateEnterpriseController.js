const createEnterpriseService = require('../../services/enterprise/CreateEnterpriseService');
const EnterpriseAuthValidator = require('../../validators/enterprise/EnterpriseValidator');

module.exports = async (req, res) => {
  try {
    const { role, id } = req.user;
    const { company_name, CNPJ, cep, commercial_phone } = req.body;

    const validator = await EnterpriseAuthValidator(req.body);
    if (validator.error) throw validator.error;

    const createEnterprise = await createEnterpriseService(
      {
        role,
        user_id: id,
        company_name,
        CNPJ,
        cep,
        commercial_phone
      }
    );
    res.status(201).json(createEnterprise);
  } catch (error) {
    res.status(400).json({
      error: 'Something wrong happened, try again!',
      message: error.message
    });
  }
};
