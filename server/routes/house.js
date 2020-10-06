/* eslint-disable prettier/prettier */
import express from 'express'
import {
  index,
  create,
  show,
  photosUpload,
  update,
} from '../controllers/houseConroller'
import redisCacheCheck from "../middleware/redisCheck"
// const multer = require('multer')

// const upload = multer({ dest: 'images/houses/' }) // .array('photos', 5)

const router = express.Router()

// Routes
router.get('/', index)
router.post('/', create)
router.put('/upload-photos/:id', photosUpload)
router.route('/:id')
  .get( show)
  .put(update)

module.exports = router
