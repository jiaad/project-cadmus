const httpStatusCode = require('http-status-codes')
const asyncHandler = require('../middleware/asyncHandler')

module.exports = {
  index: asyncHandler(async (req, res) => {
    res.status(httpStatusCode.OK).json({ title: 'index', data: 'nothing yet' })
  }),
}
