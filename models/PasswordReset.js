const mongoose = require('mongoose');
const { reset } = require('nodemon');

const PasswordResetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    expiry: { type: Date, required: true },
  });
  
  module.exports = mongoose.model('PasswordReset', PasswordResetSchema,"reset");