const FindEnterpriseByIdService = require('../../services/enterprise/FindEnterpriseByIdService');

module.exports = {
  async findEnterprise (req, res) {
    const { id } = req.params;
    const { role } = req.user;
    try {
      const enterprise = await FindEnterpriseByIdService(id, role);
      res.status(200).json(enterprise);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again!',
        message: error.message
      });
    }
  }
};
