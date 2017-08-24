const mongoose = require('mongoose')

const history = mongoose.Schema({
  duty_id: mongoose.Schema.Types.ObjectId,
  user_id: mongoose.Schema.Types.ObjectId,
  date: Date,
  done: { type: Boolean, default: false },
})

module.exports = mongoose.model('History', history)
