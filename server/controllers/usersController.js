import httpStatusCode from 'http-status-codes'
import asyncHandler from '../middleware/asyncHandler'
import User from '../models/User'
import ErrorResponse from '../utils/errorResponse'

module.exports = {
  index: asyncHandler(async (req, res) => {
    const users = await User.find()
    // console.error(users)
    res.status(httpStatusCode.OK).json({ title: 'users', data: users })
  }),

  create: asyncHandler(async (req, res) => {
    const params = req.body
    const user = await User.create(params)
    res.status(201).json({
      success: true,
      data: user,
    })
  }),
  show: asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById(id)
    console.log('show controller: : ', user)
    if (!user) {
      return next(
        new ErrorResponse(
          'User not found with this id',
          httpStatusCode.NOT_FOUND
        )
      )
    }
    return res.status(httpStatusCode.OK).json({ success: true, data: user })
  }),

  update: asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res
      .status(200)
      .json({ success: true, data: user, msg: 'Updated successfully' })
  }),

  deleteUser: asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res
      .status(httpStatusCode.OK)
      .json({ success: true, msg: 'successfully deleted user', data: {} })
  }),
}
