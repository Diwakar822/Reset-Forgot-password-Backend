const mongoose = require('mongoose');
const PasswordReset = require('./PasswordReset');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  module.exports = mongoose.model('User', UserSchema,"forgot");