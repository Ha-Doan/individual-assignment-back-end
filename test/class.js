//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.MONGO_URL = 'mongodb://localhost/testclasses'

let mongoose = require("mongoose");
let Class  = require('../models/testClass')

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp);

describe('Classes', () => {
    beforeEach((done) => { //Before each test we empty the database
        Class.remove({}, (err) => {
           done()
        });
    });

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
     let myClass = new Class({
         batch: 1,
         startDate: "2017-03-08",
         endDate: "2017-05-08",
     })
    myClass.save((err, myClass) => {
     chai.request(server)
         .post('/classes')
         .send(myClass)
         .end((err, res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
             res.body.should.have.property('batch')
             res.body.should.have.property('startDate')
             res.body.should.have.property('endDate')

           done()
           })
     })

 })
})
 describe('/GET/:id class', () => {
      it('it should GET a class by the given id', (done) => {
        let myClass = new Class({
            batch: 1,
            startDate: "2017-03-08",
            endDate: "2017-05-08",
            students: [{
              fullname: "ha",
              photo: "photoUrl",
              evaluations: [null],
            }],
        })
        myClass.save((err, myClass) => {
        chai.request(server)
          .get('/classes/' + myClass.id)
          .send(myClass)
          .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('batch')
                res.body.should.have.property('startDate')
                res.body.should.have.property('endDate')
                res.body.should.have.property('_id').eql(myClass.id)
              done()
            })
        })

       })
     })
  describe('/GET/:id/students', () => {
       it('it should GET students of the class which has the given id', (done) => {
         let myClass = new Class({
             batch: 1,
             startDate: "2017-03-08",
             endDate: "2017-05-08",
             students: [{
               fullname: "ha",
               photo: "photoUrl",
               evaluations: [null],
             }],
         })

         myClass.save((err, myClass) => {
             chai.request(server)
             .get('/classes/' + myClass.id + '/students')
             .send(myClass)
             .end((err, res) => {
                 res.should.have.status(200)
                 res.body.should.be.a('array')
                 res.body.length.should.be.eql(1)
                 res.body[0].should.have.property('fullname')
                 res.body[0].should.have.property('photo')
                 res.body[0].should.have.property('evaluations')
               done()
             })
         })

       })
   })

   describe('/PATCH/:id class', () => {
      it('it should ADD a student to a class given the id', (done) => {
        let myClass = new Class({
            batch: 1,
            startDate: "2017-03-08",
            endDate: "2017-05-08",
            students: [{
              fullname: "ha",
              photo: "photoUrl",
              evaluations: [null],
            }],
          })

            let patchedStudent = {
                fullname: "Thijs",
                photo: "anotherPhotoUrl",
                evaluations: [null],
              }
            let patchType = 'addStudent'
        myClass.save((err, myClass) => {
                chai.request(server)
                .patch('/classes/' + myClass.id)
                .send({patchedStudent, patchType})
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.students[1].should.have.property('fullname').eql('Thijs')
                    res.body.students[1].should.have.property('photo').eql('anotherPhotoUrl')

                  done()
                })
          })
      })
  })

  //After all tests are finished drop database and close connection
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    })
  })
})
