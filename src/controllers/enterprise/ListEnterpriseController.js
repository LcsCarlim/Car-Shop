const listEnterprisesService = require('../../services/enterprise/ListEnterprisesService');

module.exports = {
  async listEnterprise (req, res) {
    const { role } = req.user;
    try {
      const enterprise = await listEnterprisesService(role);
      res.status(200).json(enterprise);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again!',
        message: error.message
      });
    }
  }
};
