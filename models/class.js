// models/class.js
const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  date: { type: Date, default: Date.now },
  color: { type: String, default: null },
});

const studentSchema = new Schema({
  id: { type: Number, default: 0 },
  fullname: {type: String, default: null},
  photo: { type: String, default: null },
  isEvaluated:  { type: Boolean, default: false },
  evaluations: [evaluationSchema],
});

const classSchema = new Schema({
  students: [studentSchema],
  batch: {type: Number, default: 0},
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  totalStudents: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { usePushEach: true }); // solved the problem of different version of MongoDB

module.exports = mongoose.model('classes', classSchema)
