const findStatusSoldService = require('../../services/car/FindStatusSoldService');

module.exports = async (req, res) => {
  try {
    const statusSold = await findStatusSoldService();
    res.status(200).json(statusSold);
  } catch (error) {
    res.status(400).json({
      error: 'Something wrong happened, try again!',
      message: error.message
    });
  }
};
