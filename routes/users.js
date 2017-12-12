// routes/users.js
const router = require('express').Router()
const { User } = require('../models')

router.post('/users', (req, res, next) => {
  User.register(new User({name: req.body.name, email: req.body.email}), req.body.password, (err, user) => {
    if (err) {
      err.status = 422
      return next(err)
    }

    const {name, email, createdAt, updatedAt} = user
    res.status(201).send({name, email, createdAt, updatedAt})
  })
})



module.exports = router
