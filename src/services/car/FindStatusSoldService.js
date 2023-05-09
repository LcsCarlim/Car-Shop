const CarsModel = require('../../database/model/CarsModel');

module.exports = async () => {
  const statusSold = await CarsModel.find({ status: 'Sold' });

  const newStatus = await Promise.all(
    statusSold.map(async (newStatusSold) => {
      const newStatusSld = {
        ...newStatusSold.toObject()
      };

      return {
        car_name: newStatusSld.car_name,
        price: newStatusSld.price,
        from_enterprise: newStatusSld.from_enterprise,
        status: newStatusSld.status,
        id: newStatusSld._id
      };
    })
  );

  return newStatus;
};
