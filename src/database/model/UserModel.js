const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    selector: false
  },
  confirm_password: {
    type: String,
    required: true,
    selector: false
  },
  address: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    default: 'User'
  },
  enterprise_id: {
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

User.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;

  next();
});
User.pre('save', async function (next) {
  const hashedConfirmPassword = await bcrypt.hash(this.confirm_password, 12);
  this.confirm_password = hashedConfirmPassword;

  next();
});

module.exports = mongoose.model('User', User);
