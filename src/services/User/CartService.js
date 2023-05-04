const CarsModel = require('../../database/model/CarsModel');
const UserModel = require('../../database/model/UserModel');

module.exports = async (carId, id) => {
  const cart = [];

  const user = await UserModel.findById(id);
  if (!user) throw new Error('User not found!');

  const car = await CarsModel.findById(carId);

  if (!car) throw new Error('Car not found!');

  cart.push(car);

  return cart;
};
