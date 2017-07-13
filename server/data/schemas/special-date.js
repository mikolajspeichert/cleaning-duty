const mongoose = require('mongoose');

const specialdate = mongoose.Schema({
  date: Date,
  workday: Boolean
});


module.exports = mongoose.model("SpecialDate", specialdate);
