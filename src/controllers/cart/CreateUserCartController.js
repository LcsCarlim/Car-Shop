const createUserCartService = require('../../services/cart/CreateUserCartService');

module.exports = async (req, res) => {
  const { carId } = req.params;
  const { id } = req.user;
  try {
    const userCart = await createUserCartService(carId, id);
    res.status(201).json(userCart);
  } catch (error) {
    res.status(400).json({
      error: 'Something wrong happened, try again!',
      message: error.message
    });
  }
};
