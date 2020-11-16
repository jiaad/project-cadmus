/* eslint-disable consistent-return */
import asyncHandler from './asyncHandler'
import ErrorResponse from '../utils/errorResponse'
import House from '../models/House'
import Reservation from '../models/Reservation'
/**
 *
 * @param {*} Those two functions verifies date avaibility
 */
function datePassed(check) {
  let today
  today = new Date()
  today = Date.parse(today)
  const checkDate = Date.parse(check)
  if (checkDate < today) {
    return true
  }
  return false
}

function dateCheck(from, to, check) {
  let today
  const fromDate = Date.parse(from)
  const toDate = Date.parse(to)
  const checkDate = Date.parse(check)
  today = new Date()
  today = Date.parse(today)
  console.log('CHECK DATE ->', checkDate)
  console.log('TODAY DATE ->', today)
  console.log('TODAY BOOLEAN ->', checkDate < today)
  if (checkDate < today) {
    console.log('la date est deja passé: ->')
    return true
  }
  if (checkDate <= toDate && checkDate >= fromDate) {
    return true
  }
  return false
}

/**
 * Description of my middleware.
 * @module reservations
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return verifies if date already booked or date passed
 */
const VerifyIfAlreadyReserved = asyncHandler(async (req, res, next) => {
  const house = await House.findById(req.params.id)
  if (!house) {
    return next(new ErrorResponse('House not found with this id'), 404)
  }
  res.locals.house = house // pass house to other middleware, so it doesn't call it twice
  const reserved = await Reservation.find({ _houseId: house._id })
  if (datePassed(req.body.startDate) || datePassed(req.body.endDate)) {
    return next(new ErrorResponse("you can't book a passed date", 406))
  }

  // THE loop verifies if date is booked
  // eslint-disable-next-line no-restricted-syntax
  for (const elem of reserved) {
    console.log('start ->', elem.startDate, 'end ->', elem.endDate)
    if (dateCheck(elem.startDate, elem.endDate, req.body.startDate)) {
      console.log('lmao it already exists')
      return next(
        new ErrorResponse(
          'Please chose another date, it is already booked',
          409
        )
      )
    }
    if (dateCheck(elem.startDate, elem.endDate, req.body.endDate)) {
      console.log('lmao it already exists')
      return next(
        new ErrorResponse(
          'Please chose another date, it is already booked',
          409
        )
      )
    }
  }
  return next()
})

/**
 * Description of my middleware.
 * @module reservations
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return Verifies if delete date is older then three days
 */
function moreThenThreeDays(sDate) {
  const now = new Date()
  const startDate = new Date(sDate)
  const difference = startDate.getTime() - now.getTime()
  const numberOfSecondsInADay = 1000 * 3600 * 24
  const days = Math.ceil(difference / numberOfSecondsInADay)
  return days
}
const mustBeThreeDaysAgo = asyncHandler(async (req, res, next) => {
  const reserved = await Reservation.findById(req.params.reserve_id)
  if (!reserved)
    return next(new ErrorResponse(`Sorry reservation doesn't exists`, 404))
  if (moreThenThreeDays(reserved.startDate) <= 3) {
    return next(new Error("You can't delete now"))
  }
  req.reserve = reserved
  next()
})

module.exports = { VerifyIfAlreadyReserved, mustBeThreeDaysAgo }
