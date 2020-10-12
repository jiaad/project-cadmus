import asyncHandler from './asyncHandler'
import ErrorResponse from '../utils/errorResponse'
import User from '../models/User'
import House from '../models/House'

exports.authorizeOwner = function () {
  return asyncHandler(async (req, res, next) => {
    console.log('--------------------------------------------------------')
    const userId = req.params.id
    const jwtId = req.user._id
    const user = await User.findById(userId)
    if (!user) {
      next(new ErrorResponse('You are not authorized to enter this route', 401))
    }
    if (String(jwtId) !== String(user._id)) {
      next(new ErrorResponse('You are not authorized to enter this route', 401))
    }
    res.locals.user = user
    next()
  })
}

/**
 * Description of my middleware.
 * @module ProtectRoutes
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return give the authorization to modify house props if user is owner
 */
exports.authorizeHouseOwnerToModify = function () {
  return asyncHandler(async (req, res, next) => {
    const house = await House.findById(req.params.id)

    const userId = String(req.user._id)
    const ownerId = String(house._userId)

    if (!house) {
      return next(new ErrorResponse('Houses does not exists', 401))
    }
    if (userId !== ownerId) {
      return next(new ErrorResponse('You are not authorized', 401))
    }
    res.locals.house = house
    return next()
  })
}
