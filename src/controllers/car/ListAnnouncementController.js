const listAnnouncementService = require('../../services/car/ListAnnouncementService');

module.exports = async (req, res) => {
  try {
    const announcement = await listAnnouncementService();
    return res.json(announcement);
  } catch (error) {
    return res.status(400).json({
      error: 'Something wrong happened, try again',
      message: error.message
    });
  }
};
