const CarsModel = require('../../database/model/CarsModel');
const EnterpriseModel = require('../../database/model/EnterpriseModel');

module.exports = async (id) => {
  const findCar = await CarsModel.findOne({
    _id: id
  });
  if (!findCar) throw new Error('Car not found!');

  const company = await EnterpriseModel.findById(findCar.enterprise_id);

  const car = {
    ...findCar.toObject(),
    company_name: company.company_name
  };

  return {
    company_name: company.company_name,
    car_name: car.car_name,
    car_brand: car.car_brand,
    model: car.model,
    color: car.color,
    year: car.year,
    price: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(car.price),
    gearshift: car.gearshift,
    motor: car.motor,
    combustible: car.combustible,
    KM: car.KM,
    accessories: car.accessories,
    description: car.description,
    status: car.status
  };
};
