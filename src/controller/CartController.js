const cartService = require('../services/Cart/CartService');

module.exports = {
  async post (req, res) {
    const { carId } = req.params;
    const { user_id } = req.user;
    try {
      const carts = await cartService(carId, user_id);
      res.status(200).json(carts);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again!',
        message: error.message
      });
    }
  }
};
