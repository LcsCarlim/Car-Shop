const EnterpriseModel = require('../../database/model/EnterpriseModel');
const DocumentModel = require('../../database/model/DocumentModel');
const UserModel = require('../../database/model/UserModel');

module.exports = async ({ role, company_name, CNPJ, address, user_id, commercial_phone }) => {
  if (role !== 'Owner' && role !== 'Super') throw new Error('Without permission');

  const enterpriseExists = await EnterpriseModel.findOne({
    owner_id: user_id
  });
  if (enterpriseExists) throw new Error('Enterprise already exists!');

  const companyNameExists = await EnterpriseModel.findOne({
    company_name
  });
  if (companyNameExists) throw new Error('Enterprise name already exists!');

  const commercialPhoneExists = await EnterpriseModel.findOne({
    commercial_phone
  });
  if (commercialPhoneExists) throw new Error('Commercial phone already exists!');

  const userExists = await UserModel.findOne({
    _id: user_id
  });
  if (!userExists) throw new Error('User not exists!');

  if (userExists.length === 0) throw new Error('Error!');

  const CNPJExists = await DocumentModel.findOne({
    user_id
  });
  if (!CNPJExists) throw new Error('Invalid document!');

  const enterprise = await EnterpriseModel.create({
    owner_id: user_id,
    company_name,
    CNPJ,
    address,
    commercial_phone
  });

  const user = await UserModel.findById(user_id);
  user.enterprise_id = enterprise._id;

  await user.save();

  return enterprise;
};
