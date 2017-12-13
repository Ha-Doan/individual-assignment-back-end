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
  .get('/classes/:id', (req, res, next) => {
      const id = req.params.id
      Class.findById(id)
        .then((myClass) => {
          if (!myClass) { return next() }
          res.json(myClass)
        })
        .catch((error) => next(error))
    })
  .post('/classes', (req, res, next) => {
      const newClass = {
        batch: req.body.batch,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      }

      Class.create(newClass)
      .then((myClass) => res.json(myClass))
      .catch((error) => next(error))
    })

module.exports = router
