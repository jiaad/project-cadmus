import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler'
import ErrorResponse from './../utils/errorResponse'
import httpResponse from 'http-status-codes'
import User from '../models/User'

const authenticateJWT = asyncHandler (async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization
  // const includesBearer = req.headers.authorization.startsWith('Bearer')
  // console.error(req.headers.authorization.startsWith('Bearer'))
  if(authHeader){
    token = authHeader.split(' ')[1]
  }else if(req.cookies.token){
    token = req.cookies.token
  }
  console.log('BEARER :::', token)

  if(!token){
    next(new ErrorResponse("not authorized to access this route", 401))
  }
  try { 
    const verified = await jwt.verify(token, process.env.JWT_SECRET)
    // if(!verified){
    //   return res.sendStatus(403)
    // }
    req.user = await User.findById(verified.id)
    next()
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access to this route we eeee", 401))
  }
})
// Protect Routes

// const authenticateJWT = asyncHandler(async (req, res, next) => {
//   let token;
//   if(    req.headers.authorization ){
//     // Set token from bearer token
//       token = req.headers.authorization.split(' ')[1];
//   }
//    // Set token from cookie
//   else if(req.cookies.token){
//       token = req.cookies.token
//   }

//   // Make sure token exists
//   if(!token){
//       return next(new ErrorResponse("Not authorized to access to this route", 401))
//   }

//   try {
//       // Verify Token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log(decoded);
//       req.user = await User.findById(decoded.id);

//   next();
//   } catch (error) {
//       return next(new ErrorResponse("Not authorized to access to this route we eeee", 401))
//   }
// })

// const authenticateJWT = asyncHandler(async (req, res, next) => {
//   let token;
//   if(    req.headers.authorization ){
//     // Set token from bearer token
//       token = req.headers.authorization.split(' ')[1];
//    }
//    // Set token from cookie
//   //  else if(req.cookies.token){
//   //     token = req.cookies.token
//   //  }

//   // Make sure token exists
//   if(!token){
//     console.error('!token')
//       return next(new ErrorResponse("Not authorized to access to this route", 401))
//   }

//   try {
//       // Verify Token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log('DECODED ::::::: ', decoded);
//       req.user = await User.findById(decoded.id);

//     next();
//   } catch (error) {
//       return next(new ErrorResponse("Not authorized to access to this route we eeee", 401))
//   }
// })

export default authenticateJWT