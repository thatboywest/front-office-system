const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  stationId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['driver', 'cashier'],
    required: true,
  },
});

const SignupModel = mongoose.model('Signup', signupSchema);

module.exports = SignupModel;
