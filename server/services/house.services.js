/* eslint-disable no-unused-vars */
import multer from 'multer'
import fs from 'fs'
import env from 'dotenv'
import path from 'path'

// import House from '../models/House'
import asyncHandler from '../middleware/asyncHandler'
import ErrorResponse from '../utils/errorResponse'
import configCloudiry from '../utils/cloudinary'

exports.updatePhotos = asyncHandler(async (houseId, House, imageObj) => {
  const house = await House.findByIdAndUpdate(
    houseId,
    {
      images: imageObj,
    },
    { new: true }
  )
  return house
})

exports.cloudinaryUpload = asyncHandler(async (cloudinary, imagePath, next) => {
  const uploaded = await cloudinary.uploader.upload(imagePath)
  if (!uploaded)
    return next(
      new ErrorResponse('Server Error while uploading to Cloudinary', 400)
    )
  return uploaded
})
