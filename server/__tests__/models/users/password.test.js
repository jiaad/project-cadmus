const { ExpectationFailed } = require('http-errors');
const supertest = require('supertest');
const app = require('../../../app');
const request = supertest(app)
const User = require('../../../models/User');
const { setUpDB } = require('../../setUps/testDb')
setUpDB('mern-user-test-password')

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
afterEach(async () => {
  await User.deleteMany({})
})

describe('User password Hash', () => {
  it('should hash password', async () => {
    expect.assertions(1)
    const newUser = new User(params)
    const createdUser = newUser.save()
    const actualPassword = params.password
    expect(actualPassword).not.toEqual(createdUser.password)
  });
});