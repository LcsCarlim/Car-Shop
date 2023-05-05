const UserModel = require('../../database/model/UserModel');
const EnterpriseModel = require('../../database/model/EnterpriseModel');
const CarsModel = require('../../database/model/CarsModel');

module.exports = async (id, CNPJ, deposit, carId) => {
  const userPayer = await UserModel.findById(id);

  if (!userPayer) throw new Error('User not found!');

  if (userPayer.balance < deposit) throw new Error('Insufficient funds!');

  if (CNPJ === id) throw new Error('Transfer failed!');

  const enterpriseReciver = await EnterpriseModel.findOne({
    CNPJ
  });

  if (!enterpriseReciver) throw new Error('Enterprise not found!');

  const car = await CarsModel.findOne({
    _id: carId
  });

  if (!car) throw new Error('Car not found!');

  if (userPayer.balance < car.price) throw new Error('Insufficient funds. Try again');

  if (deposit !== car.price) throw new Error('Check that the value is entered correctly!');

  userPayer.balance -= deposit;

  await userPayer.save();

  enterpriseReciver.balance += deposit;

  await enterpriseReciver.save();

  car.status = 'Sold';
  car.owner_id = id;

  await car.save();

  return {
    deposit,
    Enterprise_Name: enterpriseReciver.company_name,
    CNPJ: enterpriseReciver.CNPJ,
    Current_balance: userPayer.balance
  };
};
