const findStatusAvailableService = require('../../services/car/FindStatusAvailableService');

module.exports = async (req, res) => {
  const { status } = req.params;
  try {
    const statusAvailable = await findStatusAvailableService(status);
    res.status(200).json(statusAvailable);
  } catch (error) {
    res.status(400).json({
      error: 'Something wrong happened, try again',
      message: error.message
    });
  }
};
