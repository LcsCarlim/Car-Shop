const detailsService = require('../../services/car/DetailsService');

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    const details = await detailsService(id);
    res.status(200).json(details);
  } catch (error) {
    res.status(400).json({
      error: 'Something wrong happened, try again',
      message: error.message
    });
  }
};
