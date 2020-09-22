const supertest = require('supertest');
const app = require('../../../app');
const request = supertest(app)
const User = require('../../../models/User');
const { setUpDB } = require('../../setUps/testDb')
setUpDB('mern-user-test-delete')


const params = {
  name: {
    first: "john",
    last:"cena"
  },
  email: "john@cena.com",
  password: "johncena",
  position: "dev web",
  isActive: true
}


describe('Should delete user', () => {
  beforeEach(async () => {
    await User.create(params)
  })
  afterEach(async () => {
    await User.deleteMany()
  })
  it('should delete a user', async () => {
    expect.assertions(1)
    const user = await User.findOne().sort({ field: 'asc', _id: -1 })
    // console.error(user)
    const res = await request
      .delete(`/api/v1/users/${user._id}/delete`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

      expect(res.body.success).toEqual(true)
  });
});