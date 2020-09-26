import supertest from 'supertest'
import app from '../../app'
import { setUpDB } from '../setUps/testDb'
import User from '../../models/User'
import users from '../setUps/usersSeed'
const DBMemory = require('./../setUps/DBMemory')

const request = supertest(app)

// setUpDB('mern-user-auth-test')
beforeAll(async () => await DBMemory.connect());
afterEach(async () => await DBMemory.clearDatabase());
afterAll(async () => await DBMemory.closeDatabase());

const params = {
  name: {
    last: 'tusher',
    first: 'jiad',
  },
  email: 'blablanojutsu@gmail.com',
  position: 'freelance',
  isActive: true,
  password: 'azerty',
  isVerified: true
}
// beforeEach( async () =>{
//   User.create(users)
// })

// afterEach( async () => {
//   User.deleteMany()
// })
// beforeAll(async () => User.deleteMany())

describe('Authorization Pass', () => {

  // beforeEach( async () => User.deleteMany())

  it('should Authorize', async () => {
    const param = {
      name: {
        last: 'tusher',
        first: 'jiad',
      },
      email: 'jest99auth@gmail.com',
      position: 'freelance',
      isActive: true,
      password: 'azerty',
      isVerified: true
    }
    const user = new User(param)
    await user.save()

    const res = await request
      .post('/api/v1/auth/login')
      .send({ email: param.email, password: param.password })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toBeDefined()
    expect(res.body.success).toEqual(true)
  })
})

describe('Authorization fail', () => {
  it('should not Authorize', async () => {
    // User allready exists
    // try {

    const res = await request
      .post('/api/v1/auth/login')
      .send({ email: params.email, password: 'blablanojutsu' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
    // } catch (error) {
    // expect.assertions(0)

    expect(res.body.success).toEqual(false)
    expect(res.body.error).toEqual('Invalid credentials')
    // }
  })
})
