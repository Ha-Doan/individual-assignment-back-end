// index.js
const express = require('express')
const bodyParser = require('body-parser')
const { classes, users, sessions } = require('./routes')
const port = process.env.PORT || 3030
const passport = require('./config/auth')
const cors = require('cors')
const config = require('config') //load the db location from the JSON files
const morgan = require('morgan')
const app = express()

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())
  .use(classes)
  .use(users)
  .use(sessions)
  // catch 404 and forward to error handler
  .use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // final error handler
  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  })

  .listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })

module.exports = app; // for testing
