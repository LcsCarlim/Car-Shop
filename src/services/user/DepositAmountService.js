const UserModel = require('../../database/model/UserModel');

module.exports = async (id, deposit, role) => {
  if (role !== 'Super') throw new Error('Without permission');

  const user = await UserModel.findById(id);

  if (!user) throw new Error('User not found');

  user.balance += deposit;
  await user.save();
  return {
    name: user.name,
    last_name: user.last_name,
    amount_deposited: `R$ ${deposit}`,
    current_balance: `R$ ${user.balance}`
  };
};
