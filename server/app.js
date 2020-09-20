import env from 'dotenv/config'
// env.config()
import createError from 'http-errors';
import express from 'express';
const app = express()
import path from 'path'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import router  from  './routes/index'
import mongoose from 'mongoose'
import errorHandler from './middleware/errorHandler'
// const errorHandler = require('./middleware/errorHandler')

var indexRouter = require('./routes/index');

const connectDB = require('./config/mongooseConnect')
if(process.env.NODE_ENV === 'production' ){
  connectDB()
} else if(process.env.NODE_ENV === 'devlopment'){
  connectDB()
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', router);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(errorHandler);

module.exports = app;
