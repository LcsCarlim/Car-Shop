const mongoose = require('mongoose');

const Cart = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  cars: {
    type: []
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }

});

module.exports = mongoose.model('Cart', Cart);
