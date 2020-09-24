import supertest from 'supertest'
import app from '../../app'
import { setUpDB } from '../setUps/testDb'
import User from '../../models/User'
import users from '../setUps/usersSeed'

const request = supertest(app)

setUpDB('mern-user-auth-test')
const params = {
  name: {
    last: 'tusher',
    first: 'jiad',
  },
  email: 'jest99@gmail.com',
  position: 'freelance',
  isActive: true,
  password: 'azerty',
}
// beforeEach( async () =>{
//   User.create(users)
// })

// afterEach( async () => {
//   User.deleteMany()
// })

describe('Authorization Pass', () => {
  it('should Authorize', async () => {
    await User.deleteMany({}).exec()
    const user = await User.create(params)

    const res = await request
      .post('/api/v1/auth/login')
      .send({ email: params.email, password: params.password })
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
