const mongoose = require('mongoose');

var holiday = mongoose.Schema({
  start: Date,
  end: Date
});

holiday.virtual('start_timestamp')
  .get(function() {
    return  this.start + "";
  });

const user = mongoose.Schema({
  name: String,
  email: String,
  through_slack: {type: Boolean, default: true},
  holidays: [holiday]
});

module.exports = mongoose.model('User', user);
