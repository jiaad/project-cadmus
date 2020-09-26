const supertest = require('supertest')
const app = require('../../../app')

const request = supertest(app)
const { setUpDB } = require('../../setUps/testDb')
// const users = require('../../setUps/usersSeed')
const User = require('../../../models/User')
const DBMemory = require('../../setUps/DBMemory')
// initialize DB
// setUpDB('mern-show-controller-test')
beforeAll(async () => await DBMemory.connect());
afterEach(async () => await DBMemory.clearDatabase());
afterAll(async () => await DBMemory.closeDatabase());
const users = [{
  name: {
    first: 'jiad',
    last: 'tusher',
  },
  email: 'negotiator@gmail.com',
  position: 'freelance',
  isActive: true,
  password: 'azerty',
},
{
  name: {
    first: 'jiad',
    last: 'tusher',
  },
  email: 'jiad@gmail.com',
  position: 'designer',
  isActive: true,
  password: 'azerty',
},
{
  name: {
    first: 'jiad',
    last: 'tusher',
  },
  email: 'jiadxli80@gmail.com',
  position: 'freelance',
  isActive: true,
  password: 'azerty',
},]

// beforeAll(async () => {
//   await User.deleteMany()
// })
beforeEach(async () => {
  await User.create(users)
})
// afterEach(async () => {
//   await User.deleteMany()
// })

describe('Show pages should pass', () => {
  it('should show the first User DATA', async () => {
    // console.error(users)
    // const user = await User.findOne().sort({ field: -_id }).limit(1)
    const user = await User.findOne().sort({ field: 'asc', _id: -1 })
    console.error(user._id)

    const res = await request
      .get(`/api/v1/users/${user._id}`)
      .set('Accept', 'application/json')
      .expect(200)
    const { data } = res.body
    expect(data.name.first).toEqual(user.name.first)
    expect(data.name.last).toEqual(user.name.last)
    expect(data.email).toEqual(user.email)
    expect(data.position).toEqual(user.position)
  })

  it('should show the last User DATA', async () => {
    console.error(users)
    const user = await User.findOne().sort({ field: 'asc', _id: 1 })
    console.error('user last:', user)
    const res = await request
      .get(`/api/v1/users/${user._id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    const { data } = res.body
    expect(data.name.last).toEqual(user.name.last)
    expect(data.name.first).toEqual(user.name.first)
    expect(data.email).toEqual(user.email)
  })
})
afterAll(async () => {
  await User.deleteMany()
})