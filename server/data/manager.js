const mongoose = require('mongoose');
var models = {
  duty : require('./schemas/duty'),
  history : require('./schemas/history'),
  user : require('./schemas/user'),
  specialdate : require('./schemas/special-date')
}

mongoose.connect('mongodb://localhost/cleaning_duty');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Failed to connect to db'));

exports.generateError = (express, tag, error) => {
  express.status(500).type('json').json({
    from: tag,
    message: error
  })
}

exports.addUser = (name, email, slack, express) => {
  new models.user({
    name: name,
    email: email,
    slack: slack,
    created: new Date()
  }).save((err) => {
    if(err) generateError(express, "ADD_USER", err)
  })
}

exports.addDuty = (name, frequency = 0, express) => {
  new models.duty({
    name: name,
    frequency: frequency
  }).save((err) => {
    if(err) generateError(express, "ADD_DUTY", err)
  })
}

exports.addHistory = (user, duty, date) => {
  new models.history({
    user_id: user,
    duty_id: duty,
    date: date
  }).save((err)=>{})
}

exports.getUsers = () => {
    return models.user.find({}).exec()
}

exports.getUser = (id) => {
  return models.user.findById(id).exec()
}

exports.getDuties = () => {
  return models.duty.find({}).exec()
}

exports.updateDuty = (id, update, express) => {
  models.duty.findOneAndUpdate({ "_id": id }, update, (err) => {
    if(err) generateError(express, "UPDATE_DUTY", err)
  })
}

exports.getHistory = () => {
  return models.history.find({}).exec()
}
