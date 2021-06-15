/* eslint-disable no-useless-catch */
import env from 'dotenv'
import path from 'path'

const mongoose = require('mongoose')
const asyncHandler = require('../middleware/asyncHandler')

// const dbName = 'mongodb://mongo:27017/mernjobs'
const dbName = 'mongodb://localhost:27017/mernjobs'
env.config({
  path: path.resolve(__dirname, '../../.env'),
})
const connectDB = asyncHandler(async () => {
  await mongoose.connect(dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // mongo console log
  console.log(`MONGODB CONNECTED SUCCESSFULLY: ${dbName}`)
})

module.exports = connectDB
