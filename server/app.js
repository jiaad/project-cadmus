/* eslint-disable no-unused-vars */
// env.config()
import env from 'dotenv'
import createError from 'http-errors'
import fileUpload from 'express-fileupload'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import mongoose from 'mongoose'
import router from './routes/index'
import errorHandler from './middleware/errorHandler'

const app = express()
// const errorHandler = require('./middleware/errorHandler')

// ENV AFTER IMPORTS
env.config({
  path: path.resolve(__dirname, '../.env'),
})

console.log(process.env.CLOUDINARY_CLOUD_NAME)
console.log(process.env.CLOUDINARY_API_KEY)
console.log(process.env.CLOUDINARY_API_SECRET)

const indexRouter = require('./routes/index')

const connectDB = require('./config/mongooseConnect')

if (process.env.NODE_ENV === 'production') {
  connectDB()
} else if (process.env.NODE_ENV === 'devlopment') {
  connectDB()
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use(fileUpload())

app.use('/', router)

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404))
// })

// error handler
app.use(errorHandler)

module.exports = app
