const CartModel = require('../../database/model/CartModel');

module.exports = async (user_id) => {
  const cart = await CartModel.findOne({ user_id });

  return cart;
};
