/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
// import jwt from 'jsonwebtoken'
import httpStatusCodes from 'http-status-codes'
import crypto from 'crypto'
import ErrorResponse from '../utils/errorResponse'
import asyncHandler from '../middleware/asyncHandler'
import Reservation from '../models/Reservation'
import House from '../models/House'

const verifyReservation = async (ReserveModel, HouseModel, req, next) => {
  const houseId = req.params.id
  const house = HouseModel.findById(houseId)
  if (!house) {
    return next(new ErrorResponse(`House doesn't exists`, 404))
  }
  // je trouve le ReserveModel
  const reserve = await ReserveModel.findOne({ _houseId: houseId })
  if (reserve) {
    console.log('THE RESERVE MODEL EXISTS')
    return true
  }
  return false
}

const reservations = {
  create: asyncHandler(async (req, res, next) => {
    const house = res.locals.house // await House.findById(req.params.id)
    const reserve = new Reservation(req.body)
    reserve._userId = req.user._id
    reserve._houseId = req.params.id
    reserve.price = house.price
    const reserved = await reserve.save()
    res.status(202).json({ success: true, data: reserved })
  }),

  delete: asyncHandler(async (req, res, next) => {
    const reservation = req.reserve
    await Reservation.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, msg: 'Successfully deleted' })
  }),
}

module.exports = reservations
