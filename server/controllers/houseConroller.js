/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
// import cloudinary from 'cloudinary'
import multer from 'multer'
import fs from 'fs'
import env from 'dotenv'
import path from 'path'

import House from '../models/House'
import asyncHandler from '../middleware/asyncHandler'
import ErrorResponse from '../utils/errorResponse'
import configCloudiry from '../utils/cloudinary'
import { updatePhotos } from '../services/house.services'
// const upload = multer({ dest: 'images/houses/' }).array('photos', 5)

const cloudinary = require('cloudinary').v2

env.config({
  path: path.resolve(__dirname, '../../.env'),
})
const fsPromises = fs.promises

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

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
  update: asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const house = await House.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
    res
      .status(200)
      .json({ success: true, data: house, msg: 'updated correctly' })
  }),
  photosUpload: asyncHandler(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0)
      return next(new ErrorResponse(`You didn't choose any file`, 400))

    const avatar = req.files.avatar
    console.log('avatar : ', avatar)
    const imageName = `${Date.now()}_${req.params.id}_${avatar.name}`
    avatar.mv(`./images/houses/${imageName}`)
    const ImagePath = `./images/houses/${imageName}`
    console.log('image PATH', ImagePath)
    try {
      const uploaded = await cloudinary.uploader.upload(ImagePath)
    } catch (error) {
      console.log('CLOUDINARY ERROR:', error.message)
      return next(
        new ErrorResponse('Server Error while uploading to Cloudinary', 400)
      )
    }

    // Create an object of image to upload
    // const imageObj = { url: uploaded.url, public_id: uploaded.public_id }

    // Update with photos
    // const house = await updatePhotos(req.params.id, House, imageObj)
    // const house = await House.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     images: imageObj,
    //   },
    //   { new: true }
    // )
    try {
      fsPromises.unlink(ImagePath)
    } catch (err) {
      console.log(err)
    }

    // avatar.name = imageName
    // res.status(202).json({ success: true, msg: 'bien joué', data: imageObj })
    res.status(202).json({ success: true, msg: 'bien joué', data: imageName })
  }),
}
