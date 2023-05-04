const mongoose = require('mongoose');

const Enterprise = new mongoose.Schema({
  company_name: {
    type: String,
    required: true
  },
  CNPJ: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  commercial_phone: {
    type: String,
    required: true
  },
  owner_id: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  cars: {
    type: String,
    required: false
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Enterprise', Enterprise);
