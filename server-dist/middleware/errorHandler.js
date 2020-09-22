"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.values");

require("core-js/modules/web.dom-collections.for-each");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ErrorResponse = require('../utils/errorResponse');

var unknownError = function unknownError(req, res, next) {
  var err = new Error('Error unknown ::(');
  err.status = 400;
  next(err);
};

var errorHandler = function errorHandler(err, req, res, next) {
  console.log('ERROR HANDLER : : ', err);

  var error = _objectSpread({}, err);

  error.message = err.message; // Log to Console For Dev

  console.log(err.message, err.stack.red);
  console.log('==============================='); // MONGOOSE BAD OBJECT

  if (err.name === 'CastError') {
    var message = "Ressource not found";
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    var _message = "Duplicate field value entered";
    error = new ErrorResponse(_message, 400);
  } // Mongoose Validation Error


  if (err.name === 'ValidationError') {
    var _message2 = Object.values(err.errors).map(function (val) {
      return val.message;
    });

    error = new ErrorResponse(_message2, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler; //, unknownError]