const mongoose = require('mongoose')

const duty = mongoose.Schema({
  name: { type: String, unique: true },
  frequency: Number,
})

module.exports = mongoose.model('Duty', duty)
