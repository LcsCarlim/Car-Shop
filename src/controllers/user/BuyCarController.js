const BuyCarService = require('../../services/user/BuyCarService');

module.exports = {
  async buyCar (req, res) {
    try {
      const { id } = req.user;
      const { CNPJ, carId } = req.params;
      const { balance } = req.body;

      const buy = await BuyCarService(id, CNPJ, carId, balance);
      res.status(200).json(buy);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again!',
        message: error.message
      });
    }
  }
};
