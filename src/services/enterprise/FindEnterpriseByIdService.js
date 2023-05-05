const EnterpriseModel = require('../../database/model/EnterpriseModel');

module.exports = async (id) => {
  const enterprise = await EnterpriseModel.findById(id);

  return enterprise;
};
