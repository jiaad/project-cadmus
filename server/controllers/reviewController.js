/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
// import jwt from 'jsonwebtoken'
import httpStatusCodes from 'http-status-codes'
import crypto from 'crypto'
import ErrorResponse from '../utils/errorResponse'
import asyncHandler from '../middleware/asyncHandler'
import User from '../models/User'
import House from '../models/House'
import Review from '../models/Review'
import Token from '../models/Token'
import { sendEmail } from '../middleware/mailer'

module.exports = {
  createReview: asyncHandler(async (req, res, next) => {
    let review
    // add user to req.body
    req.body.user = req.user._id
    const id = req.params.house_id
    req.body.house = id
    const house = await House.findById(id)
    console.log('REVIEW FILESD : ', req.body, req.user)
    review = new Review(req.body)
    review = await review.save()
    res.status(202).json({ success: true, data: review })
  }),
}
