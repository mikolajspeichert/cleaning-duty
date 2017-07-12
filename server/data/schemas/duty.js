const mongoose = require('mongoose');

const duty = mongoose.Schema({
  name: String,
  frequency: Number
});

module.exports = mongoose.model('Duty', duty);
