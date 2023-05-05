const CarModel = require('../../database/model/CarsModel');
const EnterpriseModel = require('../../database/model/EnterpriseModel');

module.exports = async ({ car_name, car_brand, model, year, price, filename, color, gearshift, motor, combustible, KM, accessories, description, owner_id, from_enterprise }) => {
  const car = await CarModel.create({
    car_name,
    car_brand,
    model,
    year,
    price,
    filename,
    color,
    gearshift,
    motor,
    combustible,
    KM,
    accessories,
    description,
    owner_id,
    from_enterprise
  });

  CarModel.from_enterprise = EnterpriseModel._id;
  await car.save();

  return car;
};
