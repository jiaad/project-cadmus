"use strict";

require("core-js/modules/es.array.join");

var _config = _interopRequireDefault(require("dotenv/config"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _errorHandler = _interopRequireDefault(require("./middleware/errorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// env.config()
var app = (0, _express.default)();

// const errorHandler = require('./middleware/errorHandler')
var indexRouter = require('./routes/index');

var connectDB = require('./config/mongooseConnect');

if (process.env.NODE_ENV === 'production') {
  connectDB();
} else if (process.env.NODE_ENV === 'devlopment') {
  connectDB();
} // view engine setup


app.set('views', _path.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
})); // app.use(express.urlencoded({ extended: true }));

app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, '../public')));
app.use('/', _index.default); // // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
// error handler

app.use(_errorHandler.default);
module.exports = app;
