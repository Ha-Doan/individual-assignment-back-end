const router = require('express').Router()
const {Class} = require('../models')

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

function editStudent(myClass, myStudent) {
  const newStudents = myClass.students.map(student => {
    if (student._id == myStudent.id) { //they are equal values, not equal types
       if (myStudent.fullname !== '')
          student.fullname = myStudent.fullname
       if (myStudent.photo !== '')
          student.photo = myStudent.photo
     }
     return student
  })

  const patchForClass = Object.assign({}, myClass, {
    students: newStudents
  })
  return patchForClass
}

function removeStudent(myClass, myStudent) {
  const newStudents = myClass.students.filter(student => student._id != myStudent.id)  //they are equal values, not equal types
  const patchForClass = Object.assign({}, myClass, {
    students: newStudents
  })
  return patchForClass
}

router.get('/classes', (req, res, next) => {
    Class.find()
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
    Class.findById(id)
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

    Class.create(newClass)
      .then((myClass) => res.json(myClass))
      .catch((error) => next(error))
  })
  .patch('/classes/:id', (req, res, next) => {
    const id = req.params.id

    Class.findById(id)
      .then((myClass) => {
        if (!myClass) {
          return next()
        }

        const myStudent = req.body.patchedStudent
        const type = req.body.patchType

        var myPatchForClass = null
        if (type === 'addStudent')
          myPatchForClass = addNewStudent(myClass, myStudent)
        else if (type === 'editStudent')
          myPatchForClass = editStudent(myClass,myStudent)
        else if (type === 'removeStudent')
          myPatchForClass = removeStudent(myClass, myStudent)

        const updatedClass = { ...myClass, ...myPatchForClass}

        Class.findByIdAndUpdate(id, { $set: updatedClass }, {
            new: true
          })
          .then((result) => res.json(result))
          .catch((error) => next(error))
      })
          .catch((error) => next(error))
  })

  .get('/classes/:id/:studentId', (req, res, next) => {
      const id = req.params.id
      console.log('ID ' + id)
  })
module.exports = router
