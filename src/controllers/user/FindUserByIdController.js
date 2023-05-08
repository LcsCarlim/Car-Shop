const findUserByIdService = require('../../services/user/FindUserByIdService');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  try {
    const findId = await findUserByIdService(id, role);
    res.status(200).json(findId);
  } catch (error) {
    res.status(400).json({
      error: 'Something wrong happened, try again',
      message: error.message
    });
  }
};
