/* eslint-disable no-unused-vars */
import House from '../models/House'
import asyncHandler from '../middleware/asyncHandler'
import ErrorResponse from '../utils/errorResponse'

module.exports = {
  create: asyncHandler(async (req, res, next) => {
    const house = await House.create(req.body)
    res.status(201).json({
      success: true,
      msg: `Successfully saved your ${house.homeType}`,
      data: house,
    })
  }),

  show: asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const house = await House.findById(id).populate('reviews')
    res.status(200).json({ success: true, data: house })
  }),
}
