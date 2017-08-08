const manager = require('./data/manager');

module.exports = app => {
  // *************************************************
  // All backend logic made by me is here, not much to do
  // All database logic is in data package
  // Database: MongoDB, framework: Mongoose.js
  // Rest is taken from react-boilerplate
  // I've slightly edited the webpack config
  app.post('/api/user', (req, res) => {
    const body = req.body;
    manager.addUser(body, res);
  });

  app.post('/api/users/remove', (req, res) => {
    const id = req.body.id;
    manager.removeUser(id, res);
  });

  app.post('/api/duty', (req, res) => {
    const name = req.body.name;
    manager.addDuty(name, 0, res);
  });

  app.post('/api/duties', (req, res) => {
    const { id, update } = req.body;
    manager.updateDuty(id, update, res);
  });

  app.post('/api/duties/remove', (req, res) => {
    const id = req.body.id;
    manager.removeDuty(id, res);
  });

  app.get('/api/stats', (req, res) => {});

  // app.get('/api/dispense', (req, res) => dispense());

  app.get('/api/user/:id', (req, res) => {
    manager.getUser(req.params.id).then(user => {
      //    if(!err){
      res.type('json').json({
        id: user._id,
        email: user.email,
        name: user.name,
        holidays: user.holidays,
        slack: user.slack,
      });
      //      }else{
      //      manager.generateError(res, "GET_USER", err)
      //      }
    });
  });

  app.get('/api/users', (req, res) => {
    manager.getUsers().then(result => {
      // if(!err){
      res.type('json').json(
        result.map(user => ({
          id: user._id,
          name: user.name,
        })),
      );
      //  }else{
      //    manager.generateError(res, "GET_USERS", err)
      //  }
    });
  });

  app.get('/api/duties', (req, res) => {
    manager.getDuties().then(result => {
      //    if(!err){
      res.type('json').json(
        result.map(duty => ({
          id: duty._id,
          name: duty.name,
          frequency: duty.frequency,
        })),
      );
      //    }else{
      //      manager.generateError(res, "GET_DUTIES", err)
      //      }
    });
  });
};
