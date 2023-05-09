const depositAmountService = require('../../services/user/DepositAmountService');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.user;
    const { balance } = req.body;
    const deposit = await depositAmountService(
      id,
      balance,
      role
    );
    res.status(200).json(deposit);
  } catch (error) {
    res.status(400).json({
      error: 'Something wrong happened, try again',
      message: error.message
    });
  }
};
