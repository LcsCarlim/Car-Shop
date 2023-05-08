const enterpriseAuthService = require('../../services/enterprise/EnterpriseAuthService');
const EnterpriseAuthValidor = require('../../validators/enterprise/EnterpriseAuthValidor');

module.exports = {
  async enterpriseAuth (req, res) {
    try {
      const { CNPJ, commercial_phone } = req.body;

      const validor = await EnterpriseAuthValidor(req.body);
      if (validor.error) throw validor.error;

      const enterpriseAuth = await enterpriseAuthService(CNPJ, commercial_phone);
      res.status(200).json({
        message: 'Authentication successful',
        enterpriseAuth
      });
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again!',
        message: error.message
      });
    }
  }
};
