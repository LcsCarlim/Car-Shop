const cartService = require('../services/Cart/CartService');
const selfCartService = require('../services/Cart/SelfCartService');

module.exports = {
  async post (req, res) {
    const { carId } = req.params;
    const { id } = req.user;
    try {
      const carts = await cartService(carId, id);
      res.status(200).json(carts);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again!',
        message: error.message
      });
    }
  },
  async self (req, res) {
    const { user_id } = req.user;
    try {
      const selfCart = await selfCartService(user_id);
      res.status(200).json(selfCart);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  }
};
