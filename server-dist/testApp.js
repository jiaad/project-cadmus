// // env.config()
// const  env = require('dotenv').config()
// const  createError = require('http-errors');
// const  express = require('express');
// const  app = express()
// const  path = require('path')
// const  cookieParser = require('cookie-parser');
// const  logger = require('morgan');
// const  router = require('./routes/index')
// const  mongoose = require('mongoose')
// const  errorHandler = require('./middleware/errorHandler')
// // const errorHandler = require('./middleware/errorHandler')
// const PORT = 5000
// var indexRouter = require('./routes/index');
// // const connectDB = require('./config/mongooseConnect')
// // connectDB()
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// // app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../public')));
// // app.use('/', router);
// // app.listen(PORT, () => {
// //   console.log(`Server started on port`);
// // });
// function createServer() {
// 	let app = express()
// 	app.use(express.json())
// 	app.use("/api/v1", router)
// 	return app
// }
// module.exports = createServer
// // module.exports = app
"use strict";