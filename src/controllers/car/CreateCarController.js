const createCarService = require('../../services/car/CreateCarService');

module.exports = async (req, res) => {
  try {
    const { car_name, car_brand, model, year, price, color, gearshift, motor, combustible, KM, accessories, description } = req.body;
    const { id } = req.enterprise;
    const { filename } = req.file;

    const cars = await createCarService({
      id,
      filename,
      car_name,
      car_brand,
      model,
      year,
      price,
      color,
      gearshift,
      motor,
      combustible,
      KM,
      accessories,
      description,
      owner_id: id,
      from_enterprise: id
    });
    res.status(201).json(cars);
  } catch (error) {
    res.status(400).json({
      error: 'Something wrong happened, try again',
      message: error.message || 'Upload failed!'
    });
  }
};
