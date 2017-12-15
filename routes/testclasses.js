const router = require('express').Router()
const {TestClass} = require('../models')

function addNewStudent(myClass, myStudent){

  const student = {
    fullname: myStudent.fullname,
    photo: myStudent.photo,
    evaluations: [null],
  }
  var students = myClass.students
  if (students[0] === null)
    students[0] = student
  else students.push(student)

  const patchForClass = Object.assign({}, myClass, {
    students: students
  })

  return patchForClass
}

router.get('/classes', (req, res, next) => {
    TestClass.find()
      // Newest classes first
      .sort({
        createdAt: -1
      })
      // Send the data in JSON format
      .then((classes) => res.json(classes))
      // Throw a 500 error if something goes wrong
      .catch((error) => next(error))
  })
  .get('/classes/:id', (req, res, next) => {
    const id = req.params.id
    TestClass.findById(id)
      .then((myClass) => {
        if (!myClass) {
          return next()
        }
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

    TestClass.create(newClass)
      .then((myClass) => res.json(myClass))
      .catch((error) => next(error))
  })
  .patch('/classes/:id', (req, res, next) => {
    const id = req.params.id

    TestClass.findById(id)
      .then((myClass) => {
        if (!myClass) {
          return next()
        }

        const myStudent = req.body.patchedStudent
        const type = req.body.patchType
        console.log('Type ' + type)
        var myPatchForClass = null
        if (type === 'addStudent')
          myPatchForClass = addNewStudent(myClass, myStudent)

        const updatedClass = { ...myClass, ...myPatchForClass}

        TestClass.findByIdAndUpdate(id, { $set: updatedClass }, {
            new: true
          })
          .then((result) => res.json(result))
          .catch((error) => next(error))
      })
          .catch((error) => next(error))
  })

module.exports = router
