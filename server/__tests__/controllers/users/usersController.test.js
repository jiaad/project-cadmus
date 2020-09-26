/* eslint-disable jest/expect-expect */
/* eslint-disable no-unused-vars */
const supertest = require('supertest')
const app = require('../../../app')

const request = supertest(app)
const mongoose = require('mongoose')
const User = require('../../../models/User')

const databaseName = 'mern-job-test'
const dbConnect = require('../../setUps/testDb')
const DBMemory = require('./../../setUps/DBMemory')

const users = require('../../setUps/usersSeed')

// beforeAll(async function  () {
// const url =  `mongodb://127.0.0.1/${databaseName}`
// await mongoose.connect(url, { useNewUrlParser: true })
// console.log(`MONGODB CONNECTED SUCCESSFULLY: ${databaseName}`)
// await
// dbConnect.setUpDB('mern-users-controller-jobing')
beforeAll(async () => await DBMemory.connect());
afterEach(async () => await DBMemory.clearDatabase());
afterAll(async () => await DBMemory.closeDatabase());

const params = {
  name: {
    first: 'jiad',
    last: 'tusher',
  },
  email: 'gohan@gmail.com',
  position: 'freelance',
  isActive: true,
  password: 'azerty',
  isVerified: true
}
beforeAll(async () => User.deleteMany())
beforeEach(async () => await User.deleteMany({}).exec())

// afterEach(async () => {
//   await User.deleteMany({}).exec();
//   // await User.create(users)

// })
afterEach(async () => User.deleteMany({email: 'gohan@gmail.com'}))
// describe('POST end points for user on /api/V1/users/cerate', async () => {
it('should Create a USER', async (done) => {
  // const userParam = new User(params)
  // await userParam.save()

  const res = await request
    .post('/api/v1/users/create')
    .send({
      name: {
        first: 'gohan',
        last: 'san',
      },
      email: 'gohan25@gmail.com',
      position: 'freelance',
      isActive: true,
      password: 'azerty',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)

  // const user = await User.findOne({ email: 'gohan25@gmail.com' })
  // assert(response.body.data, user)
  expect(res.body.data.email).toEqual('gohan25@gmail.com')
  expect(res.body.success).toEqual(true)
  expect(res.statusCode).toEqual(201)
  expect(res.body).toHaveProperty('data')
  done()
})
// })
it('should return ressource not found', async () => {
  const res = await request
    .get('/api/v1/users/121FF465dfbdd56')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(404)

  expect(res.body.error).toEqual('Ressource not found')
  expect(res.body.success).toEqual(false)
  // .expect('"Ressource not found"') // expecting content value
  // const user = User.findById({id: '121FF465dfbdd56'})
})

it('should show all the users in index page', async () => {
  const res = request
    .get('/api/v1/users')
    .set('Accept', 'application/json')
    .expect('Content-Type', 'application/json')
    .expect(200)
})

test('should show all users api/v1/users', async () => {
  const param = {...params}
  param.email = 'jiadtest23456@gmail.com'
  const user = new User(param)
  await user.save()
  // const user = await User.create(params)
  const auth = await request
    .post('/api/v1/auth/login')
    .send({ email: param.email, password: param.password })
    .set('Accept', 'application/json')

  const token = auth.body.token
  console.error('THE TOKEN', token, auth.body)

  const res = await request
    .get('/api/v1/users')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)

})

test('should show 404 and user not found message', async () => {
  const dlt = await User.deleteMany()
  const res = await request
    .get('/api/v1/users/5f63d16ab2cc340bac605923')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(404)

  expect(res.body.success).toEqual(false)
  expect(res.body.error).toEqual('User not found with this id')
})
// Cleans up database between each test

// test('should NOT CREATE A USER', async () => {
//   const res = supertest
//     .post('/api/v1/users/create')
//     .send({
//       "name": {
//         "first": "jiad",
//         "last": "tusher"
//     },
//     "email": "jiadabdul99@gmail.com",
//     "position": "freelance",
//     "isActive": true,
//     "password": "azerty"
//     })

// });
