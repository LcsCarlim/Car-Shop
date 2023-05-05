const UserModel = require('../../database/model/UserModel');

module.exports = async (role) => {
  if (role !== 'Super') throw new Error('Without permission');
  const users = UserModel.find();

  return {
    name: users.name,
    last_name: users.last_name,
    email: users.email,
    address: users.address,
    phone_number: users.phone_number,
    balance: users.balance,
    id: users._id
  };
};
