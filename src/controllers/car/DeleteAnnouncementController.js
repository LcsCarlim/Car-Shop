const deleteAnnouncementService = require('../../services/car/DeleteAnnouncementService');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  try {
    const deleteAnnounce = await deleteAnnouncementService(id, role);
    res.status(200).json(deleteAnnounce);
  } catch (error) {
    res.status(400).json({
      error: 'Something wrong happened, try again',
      message: error.message
    });
  }
};
