const findAnnouncementByIdService = require('../../services/car/FindAnnouncementByIdService');

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    const findAnnouncement = await findAnnouncementByIdService(id);
    res.status(200).json(findAnnouncement);
  } catch (error) {
    res.status(400).json({
      error: 'Something wrong happened, try again',
      message: error.message
    });
  }
};
