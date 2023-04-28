const CarsModel = require('../../database/model/CarsModel');

module.exports = async (id, role) => {
  if (role !== 'Owner' && role !== 'Super') throw new Error('Access denied');

  const deleteCar = await CarsModel.findOne({
    _id: id
  });
  if (!deleteCar) throw new Error('Car not found');

  try {
    await CarsModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting user');
  }
};
