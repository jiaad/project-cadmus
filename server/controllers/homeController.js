const asyncHandler = require('../middleware/asyncHandler')
const httpStatusCode = require('http-status-codes');

module.exports = {
  index: asyncHandler(async(req, res, next) => {
    res.status(httpStatusCode.OK).json({title: 'index', data: 'nothing yet'});
  })
}