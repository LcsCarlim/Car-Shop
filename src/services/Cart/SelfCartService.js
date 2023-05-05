const CartModel = require('../../database/model/CartModel');

module.exports = async (user_id) => {
  const cart = await CartModel.findById(user_id);

  return cart;
};
