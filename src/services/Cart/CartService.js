const CarsModel = require('../../database/model/CarsModel');
const CartModel = require('../../database/model/CartModel');

module.exports = async (carId, user_id) => {
  const car = await CarsModel.findById(carId);

  if (!car) throw new Error('Car not found!');

  const userCart = await CartModel.findOne({ user_id });

  if (userCart) {
    const carAlreadyExists = userCart.cars.find((elemento) => elemento === carId);

    if (carAlreadyExists) { throw new Error('Car already exists!'); };
    console.log(carAlreadyExists);
    userCart.cars.push(carId);

    await userCart.save();

    return userCart;
  }

  const createCart = await CartModel.create({
    user_id,
    cars: carId
  });

  return createCart;
};
