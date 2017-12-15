const router = require('express').Router()
const { TestClass } = require('../../models')

router
    .get('/classes/:id/students', (req, res, next) => {
        const id = req.params.id

        TestClass.findById(id)
          .then((myClass) => myClass.students)
        // Send the data in JSON format
          .then((students) => res.json(students))
            // Throw a 500 error if something goes wrong
          .catch((error) => next(error))
      })

module.exports = router
