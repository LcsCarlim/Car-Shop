const CarModel = require('../../database/model/CarsModel');

module.exports = async ({ car_name, car_brand, model, year, price, filename, color, gearshift, motor, combustible, KM, accessories, description, enterprise_id }) => {
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
    enterprise_id
  });

  return car;
};
