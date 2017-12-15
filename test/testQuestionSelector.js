const questionSelector = require('../models/questionSelector')
let chai = require('chai')
let should = chai.should()

describe('question selector', () => {
  describe('selectStudentColor', () => {
    it('returns red for random number x where 0 < x < 0.5', () => {
      const color = questionSelector.selectStudentColor(0.3)
      color.should.equal('red')
    })

    it('returns yellow for random number x where 0.5 < x < 0.83', () => {
      const color = questionSelector.selectStudentColor(0.6)
      color.should.equal('yellow')
    })

    it('returns green for random number x where 0.83 < x < 1', () => {
      const color = questionSelector.selectStudentColor(0.9)
      color.should.equal('green')
    })

    it('returns red for random number x where x = 0 ', () => {
      const color = questionSelector.selectStudentColor(0)
      color.should.equal('red')
    })

    it('returns red for random number x where x = 0.5 ', () => {
      const color = questionSelector.selectStudentColor(0.5)
      color.should.equal('red')
    })

    it('returns yellow for random number x where x = 0.83 ', () => {
      const color = questionSelector.selectStudentColor(0.83)
      color.should.equal('yellow')
    })

    it('returns green for random number x where x = 1 ', () => {
      const color = questionSelector.selectStudentColor(1)
      color.should.equal('green')
    })
  })
})
