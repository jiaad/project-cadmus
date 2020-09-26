/* eslint-disable no-underscore-dangle */
const supertest = require('supertest')
const app = require('../../../app')

const request = supertest(app)
const User = require('../../../models/User')
const { setUpDB } = require('../../setUps/testDb')
const DBMemory = require('./../../setUps/DBMemory')


// setUpDB('mern-user-test-delete')
beforeAll(async () => await DBMemory.connect());
afterEach(async () => await DBMemory.clearDatabase());
afterAll(async () => await DBMemory.closeDatabase());

const params = {
  name: {
    first: 'john',
    last: 'cena',
  },
  email: 'johndelete@cena.com',
  password: 'johncena',
  position: 'dev web',
  isActive: true,
}
beforeAll(async () => await User.deleteMany())
beforeEach(async () => {
  await User.create(params)
})
describe('Should delete user', () => {

  it('should delete a user', async () => {
    expect.assertions(1)

    // const param = new User(params)
    // await param.save() 

    const user = await User.findOne().sort({ field: 'asc', _id: -1 })
    // console.error(user)
    const res = await request
      .delete(`/api/v1/users/${user._id}/delete`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body.success).toEqual(true)
  })
})
