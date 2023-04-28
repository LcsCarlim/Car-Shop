const EnterpriseModel = require('../../database/model/EnterpriseModel');
const UserModel = require('../../database/model/UserModel');

module.exports = async ({ role }) => {
  if (role !== 'Super') throw new Error('Without permission');
  const users = await UserModel.find();

  const company = await Promise.all(
    users.map(async (user) => {
      const enterprise = await EnterpriseModel.findById(user.enterprise_id);

      let enterpriseName;
      if (enterprise) {
        enterpriseName = enterprise.company_name;
      }

      const newName = {
        ...user.toObject(),
        enterprise_name: enterpriseName
      };

      return {
        name: newName.name,
        last_name: newName.last_name,
        email: newName.email,
        address: newName.address,
        phone_number: newName.phone,
        role: newName.role,
        id: newName._id,
        enterprise_name: newName.enterprise_name
      };
    })
  );
  return company;
};
