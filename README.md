# Cleaning duty - small web app to keep your office clean!

Cleaning duty is a small web app built using [Node.js](https://nodejs.org/), [Express](http://expressjs.com/), [Mongoose](http://mongoosejs.com) on server side and [React](https://facebook.github.io/react/), [Redux](http://redux.js.org), [Webpack](http://webpack.github.io/) and many more on frontend, helping to split all the office duties in the team. Has a small notification engine that will send a daily reminder by Slack webhook.

### Quick start
1. Clone this repo using `git clone https://github.com/mikolajspeichert/cleaning_duty.git cleaningduty`
2. Move to the main directory and install dependencies `cd cleaningduty && npm install`
3. You will need [MongoDB](https://www.mongodb.com) installed
4. Setup mongo database `mongod --dbpath ./db`
5. To run in dev mode: `npm start`
6. To run in prod: `npm run start:production`

> This app has been built based on https://github.com/react-boilerplate/react-boilerplate as well as https://github.com/kriasoft/react-starter-kitm. Please note that this app was build as side-project for fun and is **not production-ready**. The design is raw and unpolished.


## License

This project is licensed under the Do Whatever You Want license 2017. Do whatever you want.
