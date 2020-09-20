const supertest = require('supertest');
const app = require('../../../app');
const request = supertest(app);
const {setUpDB} = require('../../setUps/testDb');
const User = require('../../../models/User');
const users = require('../../setUps/usersSeed')
// initilize DB
setUpDB('mern-jobs-update')

beforeEach(async () => {
  await User.create(users)
})
afterEach(async () => {
  await User.deleteMany({})
})

describe('User Update should pass', () => {
  it('should update the user', async () => {
    const user = await User.findOne().sort({ field: 'asc', _id: -1 })
    const res = await request
      .put(`/api/v1/users/${user._id}/update`)
      .send({
        name: {
          first: "terminator", last: "arnold"
        },
        email: user.email,
        password: user.password,
        position: user.position,
        isActive: user.isActive
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    
    const {data} = res.body
      expect(data.name.first).toEqual("terminator")
      expect(res.statusCode).toEqual(200)
  });
})
