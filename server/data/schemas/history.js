const mongoose = require('mongoose');

const history = mongoose.Schema({
  duty_id: mongoose.Schema.Types.ObjectId,
  user_id: mongoose.Schema.Types.ObjectId,
  date: Date
});

module.exports = mongoose.model('History', history);
