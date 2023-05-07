const detailsService = require('../../services/car/DetailsService');

module.exports = {
  async details (req, res) {
    const { id } = req.params;
    try {
      const detailsCar = await detailsService(id);
      res.status(200).json(detailsCar);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  }
};
