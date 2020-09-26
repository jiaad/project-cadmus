const supertest = require('supertest')
const app = require('../../../app')

const request = supertest(app)
const { setUpDB } = require('../../setUps/testDb')
const User = require('../../../models/User')
const DBMemory = require('./../../setUps/DBMemory')
// const users = require('../../setUps/usersSeed')
// initilize DB
// setUpDB('mern-jobs-users-update')
// setUpDB('mern-user-auth-test')
beforeAll(async () => await DBMemory.connect());
afterEach(async () => await DBMemory.clearDatabase());
afterAll(async () => await DBMemory.closeDatabase());

// beforeEach(async () => {

// })
const params = [{
  name: {
    first: 'jiad',
    last: 'tusher',
  },
  email: 'updatetest@gmail.com',
  position: 'freelance',
  isActive: true,
  password: 'azerty',
  }
]
describe('User Update should pass', () => {
  beforeAll(async () => {
    // await User.deleteMany()
    await User.deleteMany()
  })
  beforeEach(async () => {
    await User.create(params)
  })
  // afterAll(async () => {
  //   await User.deleteMany({}).exec();
  // })
  it('should update the user', async () => {
    const param = new User(params)
    // await param.save()

    const user = await User.findOne().sort({ field: 'asc', _id: -1 })
    const res = await request
      .put(`/api/v1/users/${user._id}/update`)
      .send({
        name: {
          first: 'terminator',
          last: 'arnold',
        },
        email: user.email,
        password: user.password,
        position: user.position,
        isActive: user.isActive,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    const { data } = res.body
    expect(data.name.first).toEqual('terminator')
    expect(res.statusCode).toEqual(200)
  })

})
