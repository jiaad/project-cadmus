const ErrorResponse = require('../utils/errorResponse');

const unknownError = (req, res, next) => {
    const err = new Error('Error unknown ::(')
    err.status = 400
    next(err)
}

var errorHandler = function(err, req, res, next) {
  console.log('ERROR HANDLER : : ', err)
let error = {...err}
error.message = err.message
  // Log to Console For Dev
  console.log( err.message, err.stack.red);
  console.log('===============================')

  // MONGOOSE BAD OBJECT
  if (err.name === 'CastError') {
    const message = `Ressource not found`
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = `Duplicate field value entered`
    error = new ErrorResponse(message, 400);
  }

  // Mongoose Validation Error

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message)
    error = new ErrorResponse(message, 400)
  }
		res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server Error' });
	};

module.exports = errorHandler//, unknownError]