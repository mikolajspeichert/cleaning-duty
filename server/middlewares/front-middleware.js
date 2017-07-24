/* eslint-disable global-require */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const compression = require('compression');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const manager = require('../data/manager');
const dispense = require('../cron-logic/dispense')

// Dev middleware
const addDevMiddlewares = (app, webpackConfig) => {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(bodyParser.json())

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  if (pkg.dllPlugin) {
    app.get(/\.dll\.js$/, (req, res) => {
      const filename = req.path.replace(/^\//, '');
      res.sendFile(path.join(process.cwd(), pkg.dllPlugin.path, filename));
    });
  }

  //*************************************************
  // All backend logic made by me is here, not much to do
  // All database logic is in data package
  // Database: MongoDB, framework: Mongoose.js
  // Rest is taken from react-boilerplate
  // I've slightly edited the webpack config
  app.post('/api/user', (req, res) => {
      const {name, email, slack} = req.body
      manager.addUser(name, email, slack, res)
  })


  app.post('/api/duties', (req, res) => {
    const {id, update} = req.body
    manager.updateDuty(id, update, res)
  })


  app.get('/api/user/:id', (req, res) => {
    manager.getUser(req.params.id).exec((err, user)=>{
      if(!err){
        res.type('json').json({
          id: user._id,
          email: user.email,
          name: user.name,
          holidays: user.holidays,
          slack: user.through_slack
        })
      }else{
        manager.generateError(res, "GET_USER", err)
      }
    })
  })


  app.get('/api/users', (req, res) => {
    manager.getUsers().exec((err, result) => {
      if(!err){
        res.type('json').json(result.map((user) => {
          return{
            id: user._id,
            name: user.name
          }
        }))
      }else{
        manager.generateError(res, "GET_USERS", err)
      }
    })
  })


  app.get('/api/duties', (req, res) => {
    manager.getDuties().exec((err, result) => {
      if(!err){
        res.type('json').json(result.map((duty) =>{
          return{
            id: duty._id,
            name: duty.name,
            frequency: duty.frequency
          }
        }))
      }else{
        manager.generateError(res, "GET_DUTIES", err)
      }
    })
  })

  app.get('/api/noszkurwa', (req, res) => {
    dispense()
  })

  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    })
  })
}

// Production middlewares
const addProdMiddlewares = (app, options) => {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath));
  app.use(bodyParser.json())

  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
};

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../config/webpack.dev.babel');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
