/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import httpStatusCodes from 'http-status-codes'
import crypto from 'crypto'
import ErrorResponse from '../utils/errorResponse'
import asyncHandler from '../middleware/asyncHandler'
import User from '../models/User'
import Token from '../models/Token'
import { sendEmail } from '../middleware/mailer'

exports.sendEmailForAuth = asyncHandler(async (user, url, token) => {
  const email = await sendEmail({
    email: user.email,
    subject: `Email verification`,
    text: `
      'Hello,\n\n' +
      'Please verify your account by clicking the link: ${url}`,
    html: `
    <div>
      <h1>Here is your link to reset your password</h1>
      <a href='${url}'>Verify your email</a>
      <p>${token.token}</p>

    </div>
    `,
  })
  return email
})

exports.resetPasswordTokenEmail = asyncHandler(async (user, url) => {
  const informations = {
    email: user.email,
    subject: `Reset password`,
    text: `Your password link`,
    html: `
      <div>
        <h1>Here is your link to reser your password</h1>
        <a href='${url}'>Reset your password</a>
      </div>
      `,
  }
  const email = await sendEmail(informations)
  return email
})

exports.if_email_or_password_empty = (email, password, next) => {
  if (!email || !password) {
    const msg = 'Please provide an email and password'
    return next(new ErrorResponse(msg, 400))
  }
}

exports.if_user_not_isVerified_or_doesnt_exists = (user, next) => {
  if (!user) return next(new ErrorResponse(`Invalid credentials`, 401))
  if (!user.isVerified) {
    return next(
      new ErrorResponse(
        'The email must be verified. \n Please check your email or ask for resend',
        400
      )
    )
  }
}

exports.reset_user_model_tokens = (user, next, httpStatusCode) => {
  const self = user
  self.resetPasswordToken = undefined
  self.resetPasswordExpire = undefined
  self.save({ validateBeforeSave: true })
  const msg = `Email couldn't be sent`
  return next(new ErrorResponse(msg, httpStatusCode.INTERNAL_SERVER_ERROR))
}
