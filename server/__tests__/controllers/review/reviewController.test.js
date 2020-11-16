import supertest from 'supertest'
import app from './../../../app'
import User from '../../../models/User'
import House from '../../../models/House'
import { sign } from 'jsonwebtoken'
import { token } from 'morgan'

const request = supertest(app)


const DBMemory = require('../../setUps/DBMemory')

// setUpDB('mern-user-test-delete')
beforeAll(async () => await DBMemory.connect());
afterEach(async () => await DBMemory.clearDatabase());
afterAll(async () => await DBMemory.closeDatabase());


const houseParams = {
  "_userId": "5f7c46fcb9dcd10045a02205",
  "description": "welcome to my hoyse",
  "homeType": "appartement",
  "totalOccupancy": 6,
  "bedrooms": 5,
  "address": {
    "address": "3 rue du bocage",
    "city": "paris",
    "country": "france",
    "zipcode": "75015"
  },
  "hasKitchen": true,
  "hasAirConditionner": true,
  "hasHeating": true,
  "hasInternet": true,
  "hasTv": true,
  "price": 99,
  "meta": {
    "votes": 12,
    "favs": 12,
    "beds": 5,
    "baths": 2
  },
  "services": ["lmao"],
  "isOccupied": true,
  "isHiden": false
}

const userParams =    {
  "name": {
  "first": "rin",
  "last": "tentei"
},
"email": "tentei@gmail.com",
"position": "freelance",
"isActive":true,
"password": "azerty",
"isVerified": true
}



describe('Create review', () => {
  let jwtToken;
  let createdHouse
  beforeAll(async () => {
    let house = new House(houseParams)
    house = await house.save()
    createdHouse = house
    let user = await User.create(userParams)
  })
  beforeEach(async () => {
    const res = await request
      .post('/api/v1/auth/login')
      .set('Accept', 'Application/json')
      .send({email: userParams.email, password: userParams.password})
      .expect(200)

    jwtToken = res.body.token
  })
  it('should Create review', async () => {
    const house = House.findOne({bedrooms: houseParams.bedrooms})
    const res = await request
      .post(`/api/v1/reviews/${createdHouse._id}`)
      .set('Accept', 'Application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ review: "Je suis pas le meilleur",rating:3 })
      .expect(202)

      expect(res.body.data).toBeTruthy()
  });
});

describe('Should not Create review ', () => {
  let jwtToken;
  let createdHouse
  beforeAll(async () => {
    let house = new House(houseParams)
    house = await house.save()
    createdHouse = house
    let user = await User.create(userParams)
  })

  it('should ask for auth', async () => {
    const house = House.findOne({bedrooms: houseParams.bedrooms})
    const res = await request
      .post(`/api/v1/reviews/${createdHouse._id}`)
      .set('Accept', 'Application/json')
      .send({ review: "Je suis pas le meilleur",rating:3 })
      .expect(401)

      expect(res.body.success).toEqual(false)

})
})