// index.js
const express = require('express')
const bodyParser = require('body-parser')
const { classes } = require('./routes')
const { users } = require('./routes')
const port = process.env.PORT || 3030

let app = express()

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  // Our recipes routes
  .use(classes)
  .use(users)

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

  .get('/classes', (req, res, next) => {
    Class.find()
      // Newest recipes first
      .sort({ createdAt: -1 })
      // Send the data in JSON format
      .then((classes) => res.json(classes))
      // Throw a 500 error if something goes wrong
      .catch((error) => next(error))
    })
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
