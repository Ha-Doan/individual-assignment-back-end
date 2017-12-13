//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Class  = require('../models/class')

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()

chai.use(chaiHttp);
//Our parent block
describe('Classes', () => {
    beforeEach((done) => { //Before each test we empty the database
        Class.remove({}, (err) => {
           done()
        });
    });
/*
  * Test the /GET route
  */
  describe('/GET class', () => {
      it('it should GET all the classes', (done) => {
        chai.request(server)
            .get('/classes')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(0)
              done()
            })
      })
  })



describe('/POST class', () => {
  it('it should POST a class ', (done) => {
     let myClass = {
         batch: 1,
         startDate: "2017-03-08",
         endDate: "2017-05-08",
     }
     chai.request(server)
         .post('/classes')
         .send(myClass)
         .end((err, res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
             res.body.should.have.property('batch')
             res.body.should.have.property('startDate')
             res.body.should.have.property('endDate')

           done();
           })
     })

 })
})
