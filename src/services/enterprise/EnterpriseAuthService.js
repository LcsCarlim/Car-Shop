const jwt = require('jsonwebtoken');
const EnterpriseModel = require('../../database/model/EnterpriseModel');

module.exports = async (CNPJ, commercial_phone) => {
  const enterpriseCNPJ = await EnterpriseModel.findOne({
    CNPJ
  });
  if (!enterpriseCNPJ) throw new Error("CNPJ, doesn't exists!");

  if (enterpriseCNPJ.commercial_phone !== commercial_phone) throw new Error('Wrong phone');

  const secretCar = process.env.ACCESS_TOKEN_CAR;

  const token = jwt.sign({
    id: enterpriseCNPJ._id
  },
  secretCar
  );

  return token;
};
