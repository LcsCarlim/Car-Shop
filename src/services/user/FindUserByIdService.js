const UserModel = require('../../database/model/UserModel');

module.exports = async (id, role) => {
  if (role !== 'Super') throw new Error('Without permission');
  const user = await UserModel.findById({
    _id: id
  });

  return {
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    address: user.address,
    phone_number: user.phone_number,
    balance: user.balance,
    id: user._id
  };
};
