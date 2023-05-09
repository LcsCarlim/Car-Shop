const CarsModel = require('../../database/model/CarsModel');
const EnterpriseModel = require('../../database/model/EnterpriseModel');

module.exports = async (id) => {
  const company = await EnterpriseModel.findOne(id);
  if (!company) throw new Error('Enterprise not found!');

  const cars = await CarsModel.find({ enterprise_id: company._id });

  const annoucements = await Promise.all(
    cars.map(async (anounce) => {
      const newAnounce = {
        ...anounce.toObject(),
        company_name: company.owner_id
      };

      return {
        enterprise_name: company.company_name,
        car_name: newAnounce.car_name,
        car_brand: newAnounce.car_brand,
        model: newAnounce.model,
        color: newAnounce.color,
        year: newAnounce.year,
        price: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(newAnounce.price),
        status: newAnounce.status,
        id: newAnounce._id
      };
    })
  );
  return annoucements;
};
