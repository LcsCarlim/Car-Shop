const getUserCartService = require('../../services/cart/GetUserCartService');

module.exports = {
  async getCart (req, res) {
    const { id } = req.user;
    try {
      const cart = await getUserCartService(id);
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again!',
        message: error.message
      });
    }
  }
};
