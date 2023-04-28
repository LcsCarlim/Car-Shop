const UserModel = require('../../database/model/UserModel');

module.exports = async ({ name, last_name, email, password, confirm_password, phone_number, address, role }) => {
  const emailExists = await UserModel.findOne({
    email
  });
  if (emailExists) throw new Error('Email already exists!');

  const phoneNumberExists = await UserModel.findOne({
    phone_number
  });
  if (phoneNumberExists) throw new Error('Phone nuber already exists!');

  if (password !== confirm_password) throw new Error("Password doens't match");

  const user = await UserModel.create({
    name,
    last_name,
    email,
    password,
    confirm_password,
    phone_number,
    address,
    role
  });

  return {
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    address: user.address,
    phone_number: user.phone_number,
    balance: user.balance,
    id: user._id
  };
};
