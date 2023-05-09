const UserModel = require('../../database/model/UserModel');
const GetCepGateway = require('../../gateway/GetCepGateway');

module.exports = async ({ name, last_name, email, password, confirm_password, phone_number, cep, role }) => {
  const emailExists = await UserModel.findOne({
    email
  });
  if (emailExists) throw new Error('Email already exists!');

  const phoneNumberExists = await UserModel.findOne({
    phone_number
  });
  if (phoneNumberExists) throw new Error('Phone number already exists!');

  if (password !== confirm_password) throw new Error("Password doens't match");

  const response = await GetCepGateway(cep);

  const user = await UserModel.create({
    name,
    last_name,
    email,
    password,
    phone_number,
    cep: response.data.logradouro,
    role
  });

  return {
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    address: user.cep,
    phone_number: user.phone_number,
    balance: user.balance,
    role: user.role,
    id: user._id
  };
};
