const findAnnouncementByNameService = require('../../services/car/FindAnnouncementByNameService');

module.exports = {
  async findAnnouncementByName (req, res) {
    const { company_name } = req.params;
    try {
      const findAnnouncement = await findAnnouncementByNameService(company_name);
      res.status(200).json(findAnnouncement);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  }
};
