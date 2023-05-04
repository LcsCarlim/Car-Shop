const CarsModel = require('../../database/model/CarsModel');
const CartModel = require('../../database/model/CartModel');

module.exports = async (carId, user_id) => {
  const car = await CarsModel.findById({
    _id: carId
  });
  if (!car) throw new Error('Car not found!');

  const createCart = await CartModel.create({
    cars: [car],
    user_id
  });

  return createCart;
};
