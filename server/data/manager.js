const mongoose = require('mongoose')
// Schemas load
const models = {
  duty: require('./schemas/duty'),
  history: require('./schemas/history'),
  user: require('./schemas/user'),
  specialdate: require('./schemas/special-date'),
}

// Database connecting, default ./db
mongoose.connect('mongodb://localhost/cleaning_duty')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Failed to connect to db'))

// Simple error gen function
const generateError = (express, tag, error) => {
  express.status(500).type('json').json({
    from: tag,
    message: error,
  })
}

exports.generateError = generateError
exports.addUser = (body, express) => {
  if (body.id) updateUser(body, express)
  else
    new models.user({
      name: body.name,
      email: body.email,
      slack: body.slack,
      created: new Date(),
    }).save(err => {
      if (err) {
        generateError(express, 'ADD_USER', err)
      }
    })
}

exports.removeUser = (_id, express) => {
  models.user.findOneAndRemove({ _id }, err => {
    if (err) generateError(express, 'REMOVE_USER', err)
    else express.status(200).send('ok')
  })
}

exports.addDuty = (name, frequency = 0, express) => {
  new models.duty({
    name,
    frequency,
  }).save(err => {
    if (err) generateError(express, 'ADD_DUTY', err)
    else express.status(200).send('ok')
  })
}

exports.removeDuty = (_id, express) => {
  models.duty.findOneAndRemove({ _id }, err => {
    if (err) generateError(express, 'REMOVE_DUTY', err)
    else express.status(200).send('ok')
  })
}

exports.addHistory = (user, duty, date) => {
  new models.history({
    user_id: user,
    duty_id: duty,
    date,
  }).save()
}

/* Schema:
* duties: [{
    duty: {duty},
    users: [{
      user: {user},
      quantity: {quantity},
    },
  ],
}]
*
*/
exports.getStatistics = express => {
  const final = []
  models.history.find({}, (_, history) => {
    models.duty.find({}, (_, duties) => {
      models.user.find({}, (_, users) => {
        for (const duty of duties) {
          const wrapper = {
            duty: duty.name,
            users: [],
          }
          for (const user of users) {
            wrapper.users.push({
              user: user.name,
              quantity: history.filter(
                element =>
                  element.user_id === user._id && element.duty_id === duty._id
              ).length,
            })
          }
          final.push(wrapper)
        }
      })
    })
  })
}

exports.getUsers = () => models.user.find({}).exec()

exports.getUser = id => models.user.findById(id).exec()

exports.getDuties = () => models.duty.find({}).exec()

exports.updateDuty = (_id, update, express) => {
  models.duty.findOneAndUpdate({ _id }, update, err => {
    if (err) generateError(express, 'UPDATE_DUTY', err)
  })
}

const updateUser = (update, express) => {
  models.user.findOneAndUpdate({ _id: update.id }, update, err => {
    if (err) generateError(express, 'UPDATE_USER', err)
  })
}

exports.getHistory = () => models.history.find({}).exec()
