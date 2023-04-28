const UserModel = require('../../database/model/UserModel');

module.exports = async (id, deposit) => {
  const user = await UserModel.findOne({
    _id: id
  });
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
