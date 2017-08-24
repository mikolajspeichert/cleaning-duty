const mongoose = require('mongoose')

const specialdate = mongoose.Schema({
  date: Date,
})

module.exports = mongoose.model('SpecialDate', specialdate)
