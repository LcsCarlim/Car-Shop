const CarsModel = require('../../database/model/CarsModel');

module.exports = async (status) => {
  const statusAvailable = await CarsModel.find({
    status
  });
  if (status !== 'Available') throw new Error('Not found!');

  const newStatus = await Promise.all(
    statusAvailable.map(async (newStatusAvailable) => {
      const newStatusAvlb = {
        ...newStatusAvailable.toObject()
      };

      return {
        car_name: newStatusAvlb.car_name,
        price: newStatusAvlb.price,
        from_enterprise: newStatusAvlb.from_enterprise,
        status: newStatusAvlb.status,
        id: newStatusAvlb._id
      };
    })
  );

  return newStatus;
};
