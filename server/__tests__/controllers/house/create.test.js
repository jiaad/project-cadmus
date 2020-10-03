/* eslint-disable no-underscore-dangle */
const supertest = require('supertest')
const app = require('../../../app')
const fs = require('fs')
const request = supertest(app)
// const User = require('../../../models/User')
const { setUpDB } = require('../../setUps/testDb')
const DBMemory = require('./../../setUps/DBMemory')
const User = require('../../../models/User')

// setUpDB('mern-user-test-delete')
beforeAll(async () => await DBMemory.connect());
afterEach(async () => await DBMemory.clearDatabase());
afterAll(async () => await DBMemory.closeDatabase());

const params =    {
  "name": {
  "first": "rin",
  "last": "tentei"
  },
  "email": "kenoh@gmail.com",
  "position": "freelance",
  "isActive":true,
  "password": "azerty"
}

const rawData = fs.readFileSync('house.json')
let house = JSON.parse(rawData)

beforeEach(async () => await User.create(params))

describe('CREATE HOUSES', () => {
  it('should Create a house', async () => {
    
  let user = await User.findOne({email: params.email})
  user.isVerified = true
  user = await user.save()
  house._userId = user._id 
  expect.assertions(4)
  const res = await request
    .post('/api/v1/houses')
    .send(house)
    .set('Accpect', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)

    expect(res.body.data.hasKitchen).toBeTruthy()
    expect(res.body.data.homeType).toBeTruthy()
    expect(res.body.data.description).toBeTruthy()
    expect(res.body.data.price).toBeTruthy()
  });

});

describe('SHOULD NOT CREATE HOUSES', () => {
  it('should not Create a house', async () => {
    
  let user = await User.findOne({email: params.email})
  user.isVerified = true
  user = await user.save()
  house._userId = user._id 
  house.homeType = undefined
  expect.assertions(1)
  const res = await request
    .post('/api/v1/houses')
    .send(house)
    .set('Accpect', 'application/json')
    .expect('Content-Type', /json/)
    .expect(400)

    expect(res.body.success).toEqual(false)
  });

});