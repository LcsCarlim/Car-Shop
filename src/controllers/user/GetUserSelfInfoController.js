const getUserSelfInfoService = require('../../services/user/GetUserSelfInfoService');

module.exports = async (req, res) => {
  const { id } = req.user;
  try {
    const getUser = await getUserSelfInfoService(id);
    res.status(200).json(getUser);
  } catch (error) {
    res.status(400).json({
      error: 'Something wrong happened, try again',
      message: error.message
    });
  }
};
