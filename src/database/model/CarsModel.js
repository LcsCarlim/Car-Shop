const mongoose = require('mongoose');

const Car = new mongoose.Schema({
  car_name: {
    type: String,
    required: true
  },
  car_brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  gearshift: {
    type: String,
    required: true
  },
  motor: {
    type: String,
    required: true
  },
  combustible: {
    type: String,
    required: true
  },
  KM: {
    type: String,
    required: true
  },
  accessories: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  owner_id: {
    type: String,
    required: false
  },
  from_enterprise: {
    type: String,
    required: false
  },
  status: {
    type: String,
    default: 'Available'
  }

},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }

});

module.exports = mongoose.model('Car', Car);
