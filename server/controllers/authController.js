import User from '../models/User'
import jwt from 'jsonwebtoken'
import ErrorResponse from '../utils/errorResponse'
import httpStatusCodes from 'http-status-codes'
import asyncHandler from './../middleware/asyncHandler'


const sendTokenResponse =   (user, statusCode, res) => {
  const token = user.signJWT()
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 69 * 60 * 1000),
    httpOnly: true
  }
  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }
  res.status(statusCode)
    .cookie('token', token, options)
    .json({success: true, token});
}

module.exports = {

  login: asyncHandler (async (req, res, next) => {
    const { email, password } = req.body
    
    if(!email || !password)
    return next(new ErrorHandler('Please provide an email and password', 400))
    
    const user = await User.findOne({email: email})
    console.log(req.body.password, req.body.password)
    if(!user)
      return next(new ErrorResponse(`Invalid credentials`, 401))
    
    const isMatch = await user.comparePassword(password)
    if(!isMatch)
      return next(new ErrorResponse(`Invalid credentials`, 401))
    else{
      const payload = {}
      sendTokenResponse(user, 200, res)
    }
  }),
  logout: asyncHandler( async(req, res, next) => {

    res.cookie('token', 'none',{
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
    })

    res.status(200).json({success: true, msg: 'Successfully logged out'});
  }),

}
