const listAllInformationService = require('../../services/user/ListAllInformationService');

module.exports = async (req, res) => {
  const { role } = req.user;
  try {
    const users = await listAllInformationService({ role });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({
      error: 'Something wrong happened, try again',
      message: error.message
    });
  }
};
