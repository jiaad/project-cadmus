const supertest = require('supertest')
const app = require('../../../app')

const request = supertest(app)
const { setUpDB } = require('../../setUps/testDb')

setUpDB('mern-jobs-test')

describe('home page', () => {
  it('should pass home index', async () => {
    const res = await request
      .get('/api/v1/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body.title).toEqual('index')
    expect(res.body.data).not.toBeNull()
    expect(res.body.data).toBeDefined()
    expect(res.body.data).not.toBeUndefined()
    expect(res.body.data).not.toBeFalsy()
    expect(res.body.data).toBeTruthy()
  })
})
