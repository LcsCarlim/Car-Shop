const mongoose = require('mongoose');

const Upload = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  document_type: {
    type: String,
    required: true
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Upload', Upload);
