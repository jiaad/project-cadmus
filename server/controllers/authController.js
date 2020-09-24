/* eslint-disable no-unused-vars */
// import jwt from 'jsonwebtoken'
// import httpStatusCodes from 'http-status-codes'
import ErrorResponse from '../utils/errorResponse'
import asyncHandler from '../middleware/asyncHandler'
import User from '../models/User'

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.signJWT()
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 69 * 60 * 1000
    ),
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token })
}

module.exports = {
  login: asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password)
      return next(
        new ErrorResponse('Please provide an email and password', 400)
      )

    const user = await User.findOne({ email })
    console.log(req.body.password, req.body.password)
    if (!user) return next(new ErrorResponse(`Invalid credentials`, 401))

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return next(new ErrorResponse(`Invalid credentials`, 401))
    }

    // const payload = {}
    return sendTokenResponse(user, 200, res)
  }),

  logout: asyncHandler(async (req, res) => {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    })

    return res
      .status(200)
      .json({ success: true, msg: 'Successfully logged out' })
  }),

  updatePassword: asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: { password: req.body.password },
      runValidators: true,
    })
    res.status(200).josn({ success: true, msg: 'Successfully updated' })
  }),
  forgetPassword: asyncHandler(async (req, res, next) => {}),
}
