const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  phone_number: String,
  email: String,
  password: String,
  address: String,
  is_admin: Boolean,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema, 'users');
