const createUserCartService = require('../services/cart/CreateUserCartService');
const getUserCartService = require('../services/cart/GetUserCartService');

module.exports = {
  async create (req, res) {
    const { carId } = req.params;
    const { id } = req.user;
    try {
      const carts = await createUserCartService(carId, id);
      res.status(200).json(carts);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again!',
        message: error.message
      });
    }
  },
  async get (req, res) {
    const { id } = req.user;
    try {
      const selfCart = await getUserCartService(id);
      res.status(200).json(selfCart);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  }
};
