function selectStudentColor(randomNumber) {
  if(randomNumber <= 0.5) {
    return 'red'
  } else if(randomNumber <= 0.83) {
    return 'yellow'
  } else {
    return 'green'
  }
}

function selectStudentByColor(color, students) {
  const correctColorStudents = students.filter(student => getColorFromStudent(student) == color)
  const index = Math.floor(Math.random() * students.length)
  return students[index]
}

function getColorFromStudent(student) {
  const newestEvaluation = student.evaluations.reduce((newest, current) => {
    if(newest === undefined || newest.date < current.date) {
      return current
    } else {
      return newest
    }
  })

  return newestEvaluation.color
}

function getStudentForQuestion(students) {
  const randomNumber = Math.random()
  const color = selectStudentColor(randomNumber)
  const student = selectStudentByColor(color, students)
  return student
}

module.exports = { getStudentForQuestion, selectStudentColor }
