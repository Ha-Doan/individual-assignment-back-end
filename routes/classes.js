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
        students: [null]
      }

      Class.create(newClass)
        .then((myClass) => res.json(myClass))
        .catch((error) => next(error))
    })
    .patch('/classes/:id', (req, res, next) => {
        const id = req.params.id

        Class.findById(id)
          .then((myClass) => { if (!myClass) { return next() }
          console.log('classid ' + myClass._id)
          console.log('fullname ' + req.body.fullname)
          console.log('photo ' + req.body.photo)
          var student = {
            fullname: req.body.fullname,
            photo: req.body.photo,
            evaluations: [null]

          }
          console.log('myClass length ' + myClass.students.length)
          var students  = myClass.students
          if (students[0] === null)
            students[0] = student
          else students.push(student)

          console.log('STUDENTS ' + myClass.students[0].fullname)
          const patchForClass = Object.assign({}, myClass, {
            students: students
          })
          console.log('ADDED student ' + patchForClass.students[0].fullname)
          const updatedClass = { ...myClass, ...patchForClass }

          Class.findByIdAndUpdate(id, { $set: updatedClass }, { new: true })
            .then((result) => res.json(result))
            .catch((error) => next(error))
            })
        .catch((error) => next(error))
      })

module.exports = router
