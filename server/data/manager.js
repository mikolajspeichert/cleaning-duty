const mongoose = require("mongoose");
var models = {
  duty: require("./schemas/duty"),
  history: require("./schemas/history"),
  user: require("./schemas/user"),
  specialdate: require("./schemas/special-date")
};

mongoose.connect("mongodb://localhost/cleaning_duty");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Failed to connect to db"));

generateError = (express, tag, error) => {
  express.status(500).type("json").json({
    from: tag,
    message: error
  });
};
exports.generateError = generateError;
exports.addUser = (body, express) => {
  if(body.id) updateUser(body, express);
  else new models.user({
    name: body.name,
    email: body.email,
    slack: body.slack,
    created: new Date()
  }).save(err => {
    if (err) {
      generateError(express, "ADD_USER", err);
    }
  });
};

exports.removeUser = (_id, express) => {
  models.user.findOneAndRemove({ _id }, err => {
    if (err) generateError(express, "REMOVE_USER", err);
    else express.status(200).send("ok");
  });
};

exports.addDuty = (name, frequency = 0, express) => {
  new models.duty({
    name: name,
    frequency: frequency
  }).save(err => {
    if (err) generateError(express, "ADD_DUTY", err);
    else express.status(200).send("ok");
  });
};

exports.removeDuty = (_id, express) => {
  models.duty.findOneAndRemove({ _id }, err => {
    if (err) generateError(express, "REMOVE_DUTY", err);
    else express.status(200).send("ok");
  });
};

exports.addHistory = (user, duty, date) => {
  new models.history({
    user_id: user,
    duty_id: duty,
    date: date
  }).save(err => {});
};

exports.getUsers = () => {
  return models.user.find({}).exec();
};

exports.getUser = id => {
  return models.user.findById(id).exec();
};

exports.getDuties = () => {
  return models.duty.find({}).exec();
};

exports.updateDuty = (_id, update, express) => {
  models.duty.findOneAndUpdate({ _id }, update, err => {
    if (err) generateError(express, "UPDATE_DUTY", err);
  });
};

updateUser = (update, express) => {
  //  update.holidays = [{
  //    start: new Date(),
  //    end: new Date()
  //  },{
  //    start: new Date(),
  //    end: new Date()
  //  }]
  models.user.findOneAndUpdate({ _id: update.id }, update, err => {
    if (err) generateError(express, "UPDATE_USER", err);
  });
};

exports.getHistory = () => {
  return models.history.find({}).exec();
};
