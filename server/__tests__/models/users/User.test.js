/* eslint-disable no-console */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-try-expect */
const User = require('../../../models/User')
const { setUpDB } = require('../../setUps/testDb')

setUpDB('mern-user-test')

const params = {
  name: {
    first: 'john',
    last: 'cena',
  },
  email: 'john@cena.com',
  password: 'johncena',
  position: 'dev web',
  isActive: true,
}

afterEach(async () => {
  await User.deleteMany({})
})

it('should return true', () => {
  expect(process.env.NODE_ENV).toEqual('test')
})

describe('It should Create Users', () => {

  afterEach(async () => {
    await User.deleteMany()
  })
  it('should create a user', async () => {
    await User.deleteMany()
    const newUser = new User(params)
    const savedUser = await newUser.save()
    const expected = 'john'
    let actual = savedUser.name.first
    expect(actual).toEqual(expected)
    actual = 'john@cena.com'
    expect(savedUser.email).toEqual(actual)
  })
})

describe('Should not create Users', () => {
  it('should send error msg (name.first) and not create an User', async () => {
    expect.assertions(3)
    params.name.first = ''
    try {
      const newUser = new User(params)
      await newUser.save()
    } catch (e) {
      console.log(typeof e.message, e)
      expect(e).toBeTruthy()
      /** to See if the error cintains Please enter your name  */
      const msg = 'Please enter your first name'
      const err = String(e).includes(msg)
      expect(err).toEqual(true)
      expect(e.message).toMatch(new RegExp(msg))
    }
  })

  it('should send error msg (name.last) and not create an User', async () => {
    expect.assertions(3)
    params.name.first = 'john'
    params.name.last = ''
    try {
      const newUser = new User(params)
      await newUser.save()
    } catch (e) {
      expect(e).toBeTruthy()
      /** to See if the error cintains Please enter your name  */
      const msg = 'Please enter your last name'
      const err = String(e).includes(msg)
      expect(err).toEqual(true)
      expect(e.message).toMatch(new RegExp(msg))
    }
  })

  it('should send an error msg (email) and not create an User', async () => {
    expect.assertions(3)
    params.name.last = 'cena'
    params.email = ''
    try {
      const newUser = new User(params)
      await newUser.save()
    } catch (e) {
      expect(e).toBeTruthy()
      /** to See if the error cintains Please enter your name  */
      const msg = 'Please enter your email'
      const err = String(e).includes(msg)
      expect(err).toEqual(true)
      expect(e.message).toMatch(new RegExp(msg))
    }
  })

  it('should send error msg (password) and not create an User', async () => {
    expect.assertions(3)
    params.email = 'john@cena.com'
    params.password = ''
    try {
      const newUser = new User(params)
      await newUser.save()
    } catch (e) {
      expect(e).toBeTruthy()
      /** to See if the error cintains Please enter your name  */
      const msg = 'Please enter your password'
      const err = String(e).includes(msg)
      expect(err).toEqual(true)
      expect(e.message).toMatch(new RegExp(msg))
    }
  })

  it('should send error msg (isActive) and not create an User', async () => {
    expect.assertions(3)
    params.password = 'johncena'
    params.isActive = null
    // console.error(params)
    try {
      const newUser = new User(params)
      await newUser.save()
    } catch (e) {
      expect(e).toBeTruthy()
      /** to See if the error cintains Please enter your name  */
      const msg = 'Please enter your status'
      console.log(e)
      const err = String(e).includes(msg)
      expect(err).toEqual(true)
      expect(e.message).toMatch(new RegExp(msg))
    }
  })

  it('should send error msg (position) and not create an User', async () => {
    expect.assertions(3)
    params.isActive = true
    params.position = ''
    // console.error(params)
    try {
      const newUser = new User(params)
      await newUser.save()
    } catch (e) {
      expect(e).toBeTruthy()
      /** to See if the error cintains Please enter your name  */
      const msg = 'Please enter your position'
      console.log(e)
      const err = String(e).includes(msg)
      expect(err).toEqual(true)
      expect(e.message).toMatch(new RegExp(msg))
    }
  })
})
