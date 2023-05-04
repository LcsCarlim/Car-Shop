const EnterpriseModel = require('../../database/model/EnterpriseModel');

module.exports = async (id) => {
  const enterprise = EnterpriseModel.findById({
    _id: id
  });

  return {
    company_name: enterprise.company_name,
    CNPJ: enterprise.CNPJ,
    address: enterprise.address,
    balance: enterprise.balance,
    owner_id: enterprise.owner_id,
    id: enterprise.id
  };
};
