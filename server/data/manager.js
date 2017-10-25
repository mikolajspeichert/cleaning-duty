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

const updateUser = (update, express) => {
  console.log(update)
  models.user.findOneAndUpdate({ _id: update.id }, update, err => {
    if (err) generateError(express, 'UPDATE_USER', err)
  })
}

const compareDays = (date1, date2) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate()

exports.generateError = generateError
exports.addUser = (body, express) => {
  if (body.id) updateUser(body, express)
  else
    new models.user({
      name: body.name,
      email: body.email,
      slack: body.slack,
      reminder_hour: body.reminder_hour,
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
* [{
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
        for (let duty of duties) {
          let lastDone = history.filter(
            element =>
              element.duty_id.toString() === duty._id.toString() &&
              compareDays(element.date, new Date())
          )[0]
          const wrapper = {
            duty: duty.name,
            users: [],
          }
          if (lastDone.user_id)
            wrapper.currently = users.filter(
              el => el._id.toString() === lastDone.user_id.toString()
            )[0].name
          for (let user of users) {
            wrapper.users.push({
              user: user.name,
              quantity: history.filter(
                element =>
                  element.user_id.toString() === user._id.toString() &&
                  element.duty_id.toString() === duty._id.toString()
              ).length,
            })
          }
          final.push(wrapper)
        }
        express.type('json').json(final)
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

exports.getLastHistory = (
  user_id // eslint-disable-line camelcase
) =>
  models.history
    .findOne({
      user_id,
    })
    .sort('-date')
    .exec()

exports.setHistoryDone = (
  user_id, // eslint-disable-line camelcase
  express
) =>
  models.history.findOneAndUpdate(
    { user_id },
    { done: true },
    { sort: '-date' },
    err => {
      if (err) generateError(express, 'UPDATE_HISTORY', err)
    }
  )

exports.getHistory = () => models.history.find({}).exec()
