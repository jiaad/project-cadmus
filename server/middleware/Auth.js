/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler'
import ErrorResponse from '../utils/errorResponse'
import User from '../models/User'

const authenticateJWT = asyncHandler(async (req, res, next) => {
  let token
  const authHeader = req.headers.authorization
  // const includesBearer = req.headers.authorization.startsWith('Bearer')
  // console.error(req.headers.authorization.startsWith('Bearer'))
  if (authHeader) {
    // eslint-disable-next-line prefer-destructuring
    token = authHeader.split(' ')[1]
  } else if (req.cookies.token) {
    token = req.cookies.token
  }
  console.log('BEARER :::', token)

  if (!token) {
    return next(new ErrorResponse('not authorized to access this route', 401))
  }
  try {
    const verified = await jwt.verify(token, process.env.JWT_SECRET)
    // if(!verified){
    //   return res.sendStatus(403)
    // }
    req.user = await User.findById(verified.id)
    next()
  } catch (error) {
    return next(
      new ErrorResponse('Not authorized to access to this route we eeee', 401)
    )
  }
})

// const protect = (req, res, next) => {
//   // let user = req.user
//   // if(user.email)
// }

// module.exports = { authenticateJWT, protect }
module.exports = authenticateJWT
