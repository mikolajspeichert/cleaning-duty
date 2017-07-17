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

exports.test = () => {
  console.log("Testing: ");
}

exports.addUser = (name, email, slack = true) => {
  var user = new models.user({name: name, email: email, through_slack: slack})
                  .save((err) => {
                    if(err) console.log("Database failed, error: " + err);
                  })
}

exports.getUsers = (express) => {
    models.user.find({}, (err, res) => {
      if(!err){
        var result = res.map((user) => {
          return{
            id: user._id,
            name: user.name
          }
        })
        //console.log(result)
        //express.json(res)
        express.type('json').json(result)
      }else{
        express.send(err)
      }
    })
}
