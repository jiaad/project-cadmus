const supertest = require('supertest')
const app = require('../../../app')
const request = supertest(app)
const User = require('../../../models/User')
const mongoose = require('mongoose')
const { deleteOne } = require('../../../models/User')
const databaseName = 'mern-job-test'
const dbConnect = require('../../setUps/testDb')
const users = require('../../setUps/usersSeed')



// beforeAll(async function  () {
  // const url =  `mongodb://127.0.0.1/${databaseName}`
  // await mongoose.connect(url, { useNewUrlParser: true })
  // console.log(`MONGODB CONNECTED SUCCESSFULLY: ${databaseName}`)
  // await
  dbConnect.setUpDB('mern-job-controller')

// })

beforeEach(async () => {
  // await User.deleteMany({})
  await User.create(users)
})

afterEach(async () => {
  await User.deleteMany({})
})
// afterEach(async () => {
// })
// describe('POST end points for user on /api/V1/users/cerate', async () => {
  it('should Create a USER', async (done) => {
    const res = await request.post('/api/v1/users/create')
      .send({
        "name": {
          "first": "jiad",
          "last": "tusher"
      },
      "email": "gohan@gmail.com",
      "position": "freelance",
      "isActive": true,
      "password": "azerty"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      const email = "gohan@gmail.com"
      const user = await User.findOne({email})
      // assert(response.body.data, user)
      expect(res.body.data.email).toEqual(user.email)
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

    const err = 'Ressource not found'
    expect(res.body.error).toEqual(err)
    expect(res.body.success).toEqual(false)
    // .expect('"Ressource not found"') // expecting content value
    // const user = User.findById({id: '121FF465dfbdd56'}) 
});

it('should show all the users in index page', async () => {
  const res = request
    .get('/api/v1/users')
    .set('Accept', 'application/json')
    .expect('Content-Type', 'application/json')
    .expect(200)
});
test('should show ell users api/v1/users', async () => {
  const res = await request
    .get('/api/v1/users')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    console.log(users)
});

test('should show 404 and user not found message', async () => {
  const res = await request
    .get('/api/v1/users/5f63d16ab2cc340bac605923')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(404)

    expect(res.body.success).toEqual(false)
    const err = "User not found with this id"
    expect(res.body.error).toEqual(err)
});
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

