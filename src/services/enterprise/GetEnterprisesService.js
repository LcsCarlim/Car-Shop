const EnterpriseModel = require('../../database/model/EnterpriseModel');

module.exports = async (role) => {
  if (role !== 'Super') throw new Error('Without permission');
  const enterprise = await EnterpriseModel.find().exec();

  const newEnterprise = enterprise.map((newEntp) => {
    const newEntpse = {
      ...newEntp.toObject()
    };

    return {
      company_name: newEntpse.company_name,
      CNPJ: newEntpse.CNPJ,
      address: newEntpse.address,
      balance: newEntpse.balance,
      owner_id: newEntpse.owner_id,
      id: newEntpse._id
    };
  });

  return newEnterprise;
};
