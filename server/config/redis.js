// import redis from 'redis'
const redis = require('redis')
const { promisify } = require('util')

const client = redis.createClient({
  // port: '6379',
  // host: 'redis-cache',
  host: 'localhost',
  password: 'redispassword',
})

const GET_ASYNC = promisify(client.get).bind(client)
const SET_ASYNC = promisify(client.set).bind(client)

client.on('connect', () => {
  console.log('Redis Database connected \n')
})

client.on('reconnect', () => {
  console.log('Redis Database reconnected \n')
})

client.on('ready', () => {
  console.log('Redis Database ready \n')
})

client.on('end', () => {
  console.log('\nRedis client disconnected')
  console.log('Redis Database going down \n')
})

module.exports = { client, GET_ASYNC, SET_ASYNC, redis }
