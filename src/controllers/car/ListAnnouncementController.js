const listAnnouncementService = require('../../services/car/ListAnnouncementService');

module.exports = {
  async listAnnouncement (req, res) {
    try {
      const list = await listAnnouncementService;
      res.status(200).json(list);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again!',
        message: error.message
      });
    }
  }
};
