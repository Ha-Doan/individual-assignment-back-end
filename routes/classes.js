const router = require('express').Router()
const { Class } = require('../models')

router.get('/classes', (req, res, next) => {
  Class.find()
    // Newest classes first
    .sort({ createdAt: -1 })
    // Send the data in JSON format
    .then((classes) => res.json(classes))
    // Throw a 500 error if something goes wrong
    .catch((error) => next(error))
  })

module.exports = router
