const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080
const {testclasses, teststudents} = require('./routes')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
.use(testclasses)
.use(teststudents)


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
app.listen(port);
console.log("Listening on port " + port)

module.exports = app // for testing
