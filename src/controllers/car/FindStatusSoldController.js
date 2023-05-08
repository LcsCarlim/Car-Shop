const findStatusSoldService = require('../../services/car/FindStatusSoldService');

module.exports = async (req, res) => {
  const { status } = req.params;
  try {
    const statusSold = await findStatusSoldService(status);
    res.status(200).json(statusSold);
  } catch (error) {
    res.status(400).json({
      error: 'Something wrong happened, try again!',
      message: error.message
    });
  }
};
