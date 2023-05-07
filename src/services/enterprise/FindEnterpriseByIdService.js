const EnterpriseModel = require('../../database/model/EnterpriseModel');

module.exports = async (id, role) => {
  if (role !== 'Super') throw new Error('Without permission');
  const enterprise = await EnterpriseModel.findById(id);

  return enterprise;
};
