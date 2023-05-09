const CarsModel = require('../../database/model/CarsModel');
const EnterpriseModel = require('../../database/model/EnterpriseModel');

module.exports = async () => {
  const cars = await CarsModel.find({ status: 'Available' });

  const annoucements = await Promise.all(
    cars.map(async (anounce) => {
      const enterprise = await EnterpriseModel.findById(anounce.from_enterprise);

      const newAnounce = {
        ...anounce.toObject(),
        enterprise_name: enterprise.company_name
      };

      return {
        enterprise_name: newAnounce.enterprise_name,
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
