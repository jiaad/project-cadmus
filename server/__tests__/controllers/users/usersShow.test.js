const supertest = require('supertest')
const app = require('../../../app')
const request = supertest(app)
const { setUpDB } = require('../../setUps/testDb')
const users = require('../../setUps/usersSeed')
const User = require('../../../models/User');
// initialize DB
setUpDB('mern-jobs-show')

beforeEach(async () => {
  await User.create(users)
})
afterEach(async () => {
  await User.deleteMany({})
})
describe('Show pages should pass', () => {
  it('should show the first User DATA', async () => {
    const users = await User.find({})
    // const user = await User.findOne().sort({ field: -_id }).limit(1)
    const user = await User.findOne().sort({ field: 'asc', _id: -1 })
    const res = await request
      .get(`/api/v1/users/${user._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      const { data } = res.body
      expect(data.name.first).toEqual(user.name.first)
      expect(data.name.last).toEqual(user.name.last)
      expect(data.email).toEqual(user.email)
      expect(data.position).toEqual(user.position)
  });

  it('should shownthe last User DATA', async () => {
    const user = await User.findOne().sort({ field: 'asc', _id: 1 })

    const res = await request
      .get(`/api/v1/users/${user._id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

      const {data} = res.body
      expect(data.name.last).toEqual(user.name.last)
      expect(data.name.first).toEqual(user.name.first)
      expect(data.email).toEqual(user.email)

  });

});