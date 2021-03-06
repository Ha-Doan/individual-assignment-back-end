// index.js
const express = require('express')
const bodyParser = require('body-parser')
const { classes, users, sessions, students } = require('./routes')
const port = process.env.PORT || 3030
const passport = require('./config/auth')
const cors = require('cors')
const app = express()


app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())
  .use(classes)
  .use(users)
  .use(sessions)
  .use(students)
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
