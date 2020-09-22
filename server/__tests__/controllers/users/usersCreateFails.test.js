const { response } = require('express');
const supertest = require('supertest')
const app = require('../../../app')
const request = supertest(app)
const User = require('../../../models/User')
// const { setUpDB } = require('./setUps/testDb');
const dbConnect = require('../../setUps/testDb')
const users = require('../../setUps/usersSeed')

dbConnect.setUpDB('mern-job-test')

beforeEach(async () => {
  await User.create(users)
})
afterEach(async () => {
  await User.deleteMany({})
})

describe('Test fail Name Errors', () => {
  
  it('should show first name error : Please enter your first name', async () => {
    try {
      const res = await request
      .post('/api/v1/users/create')
      .send({
        "name": {
          "last": "tusher"
        },
        "email": "jest99@gmail.com",
        "position": "freelance",
        "isActive": true,
        "password": "azerty"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    } catch (error) {
      expect.assertions(3)
      expect(res.body.error).toEqual("Please enter your first name")
      expect(res.statusCode).toEqual(400)
      expect(res.body.success).toEqual(false)
    }



      
  });

  it('should show last name error: please enter your last name', async () => {
    
    try {
      const res = await request
      .post('/api/v1/users/create')
      .send({
        "name": {
          "first": "tusher"
        },
        "email": "jest100@gmail.com",
        "position": "freelance",
        "isActive": true,
        "password": "azerty"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
    } catch (error) {
      expect.assertions(3)
    expect(res.body.error).toEqual("Please enter your last name")
    expect(res.statusCode).toEqual(400)
    expect(res.body.success).toEqual(false)
    }


  });

  it('should show : Please enter your first name,Please enter your first name', async () => {
    // expect.assertions(3)
    try {
      const res = await request
      .post('/api/v1/users/create')
      .send({
      "email": "TestJest99@gmail.com",
      "position": "freelance",
      "isActive": true,
      "password": "azerty"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
    } catch (e) {
      expect(res.body.error).toEqual("Please enter your last name,Please enter your first name")
      expect(res.body.success).toEqual(false)
      expect(res.statusCode).toEqual(400)
    }


  });
});




