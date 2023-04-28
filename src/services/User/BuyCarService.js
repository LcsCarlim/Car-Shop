const UserModel = require('../../database/model/UserModel');
const EnterpriseModel = require('../../database/model/EnterpriseModel');
const CarsModel = require('../../database/model/CarsModel');

module.exports = async (id, CNPJ, deposit, carId) => {
  const userPayer = await UserModel.findOne({
    _id: id
  });
  if (!userPayer) throw new Error('User not found!');

  if (CNPJ === id) throw new Error('Transfer failed!');

  if (userPayer.balance < deposit) throw new Error('Insufficient funds!');

  const enterpriseReciver = await EnterpriseModel.findOne({
    CNPJ
  });
  if (!enterpriseReciver) throw new Error('Enterprise not found!');

  const car = await CarsModel.findOne({
    _id: carId
  });
  if (!car) throw new Error('Car not found!');

  userPayer.balance -= deposit;
  await userPayer.save();

  enterpriseReciver.balance += deposit;
  await enterpriseReciver.save();

  user

  return {
    deposit,
    Name: enterpriseReciver.company_name,
    CNPJ: enterpriseReciver.CNPJ,
    Current_balance: userPayer.balance
  };
};
