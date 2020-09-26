/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
// import jwt from 'jsonwebtoken'
import httpStatusCodes from 'http-status-codes'
import crypto from 'crypto'
import ErrorResponse from '../utils/errorResponse'
import asyncHandler from '../middleware/asyncHandler'
import User from '../models/User'
import Token from '../models/Token'
import { sendEmail } from '../middleware/mailer'
import {
  sendEmailForAuth,
  resetPasswordTokenEmail,
  if_email_or_password_empty,
  if_user_not_isVerified_or_doesnt_exists,
} from '../services/auth.services'

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
    if_email_or_password_empty(email, password, next) // if

    const user = await User.findOne({ email: req.body.email })
    if_user_not_isVerified_or_doesnt_exists(user, next)
    const isMatch = await user.comparePassword(password)
    if (!isMatch) return next(new ErrorResponse(`Invalid credentials`, 401))
    return sendTokenResponse(user, 200, res)
  }),

  signUp: asyncHandler(async (req, res, next) => {
    let user
    user = await User.findOne({ email: req.body.email })
    if (user)
      return next(
        new ErrorResponse(
          'The email address you have entered is already associated with another account.',
          400
        )
      )

    user = new User(req.body)
    await user.save()
    const token = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString('hex'),
    })
    await token.save()
    const url = `http://${req.headers.host}/api/v1/auth/confirmation/${token.token}`
    const email = await sendEmailForAuth(user, url, token)
    res.status(200).json({
      success: true,
      msg: `A verification email has been sent to ${user.email}.`,
    })
  }),

  confirmationPost: asyncHandler(async (req, res, next) => {
    const token = await Token.findOne({ token: req.body.token })
    if (!token)
      return next(
        new ErrorResponse(
          'We were unable to find a valid token. Your token may have expired.',
          400
        )
      )
    const user = await User.findOne({
      email: req.body.email,
      _id: token._userId,
    })
    if (!user)
      return next(
        new ErrorResponse('We were unable to find a user for this token.', 400)
      )
    if (user.isVerified)
      return next(new ErrorResponse('User allready verified', 400))

    user.isVerified = true
    await user.save({ validateBeforeSave: false })
    res
      .status(200)
      .json({ success: true, msg: 'The account is verified, please log in' })
  }),

  resendConfirmation: asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user)
      return next(
        new ErrorResponse('We were unable to find a user with that email.', 400)
      )

    const newToken = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString('hex'),
    })
    const token = await newToken.save({ validateBeforeSave: false })
    if (!token)
      return next(
        new ErrorResponse('A problem occured while sending email', 400)
      )

    const url = `http://${req.headers.host}/api/v1/auth/confirmation/`
    const email = await sendEmailForAuth(user, url, token)

    res.status(200).json({ success: true, msg: 'A new email has been sent' })
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
  forgotPassword: asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return next(new ErrorResponse('Account not found', 404))
    }

    const resetPasswordToken = user.generateResetPassword()
    console.log('PASSWORD TOKEN:', resetPasswordToken)
    await user.save({ validateBeforeSave: false })
    try {
      const url = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/auth/reset-password/${resetPasswordToken}`

      const email = await resetPasswordTokenEmail(user, url)
      res.status(200).json({ success: true, data: 'Email sent' })
    } catch (e) {
      console.error('ERROR MAILER:', e.message)
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined
      user.save({ validateBeforeSave: false })
      const msg = `Email couldn't be sent`
      return next(new ErrorResponse(msg, httpStatusCodes.INTERNAL_SERVER_ERROR))
    }

    res
      .status(httpStatusCodes.OK)
      .json({ success: true, msg: 'Message sent', data: user })
  }),

  resetPassword: asyncHandler(async (req, res, next) => {
    const token = req.params.token
    const resetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    })
    if (!user) {
      return next(new ErrorResponse(`Invalid token`, 404))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()
    sendTokenResponse(user, 200, res)
    res.status(200).json({ success: true, data: user })
  }),
}
