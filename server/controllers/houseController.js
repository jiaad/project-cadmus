/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
// import cloudinary from 'cloudinary'
import multer from 'multer'
import fs from 'fs'
import env from 'dotenv'
import path from 'path'
import redis from 'redis'

import House from '../models/House'
import asyncHandler from '../middleware/asyncHandler'
import ErrorResponse from '../utils/errorResponse'
import configCloudiry from '../utils/cloudinary'
import { updatePhotos } from '../services/house.services'
import { redisGetDataService } from '../services/redis.services'
// const client = redis.createClient(6379)

import { client, GET_ASYNC, SET_ASYNC } from '../config/redis'

// const upload = multer({ dest: 'images/houses/' }).array('photos', 5)

const cloudinary = require('cloudinary').v2
const { promisify } = require('util')

const unlinkFileasync = promisify(fs.unlink)

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
  index: asyncHandler(async (req, res, next) => {
    const houses = await House.find({})
    const setRedisData = await SET_ASYNC(
      'houses',
      JSON.stringify(houses),
      'EX',
      10 * 10
    )
    console.log('new data cached:', setRedisData)
    res.status(200).json({ success: true, data: houses })
  }),

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

    // const getRedisData = await GET_ASYNC(id)
    // if (getRedisData) {
    //   console.log('using Cached Data')
    //   res.status(200).json({ success: true, data: JSON.parse(getRedisData) })
    //   return
    // }

    const house = await House.findById(id).populate('reviews')
    if (!house) {
      return next(new ErrorResponse('House not found', 404))
    }
    const setRedisData = await SET_ASYNC(
      id,
      JSON.stringify(house),
      'EX',
      10 * 10
    )
    console.log('NEW CACHED DATA, id:', setRedisData)
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
      const imageObj = { url: uploaded.url, public_id: uploaded.public_id }
      const delImage = await unlinkFileasync(ImagePath)
      await House.findByIdAndUpdate(req.params.id, {
        $set: {
          images: imageObj,
        },
      })
    } catch (error) {
      console.log('CLOUDINARY ERROR:', error.message)
      return next(
        new ErrorResponse('Server Error while uploading to Cloudinary', 400)
      )
    }

    // avatar.name = imageName
    // res.status(202).json({ success: true, msg: 'bien joué', data: imageObj })
    res.status(202).json({ success: true, msg: 'bien joué', data: imageName })
  }),
}
