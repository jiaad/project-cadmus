import multer from 'multer'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './images/houses')
  },
  filename(req, file, cb) {
    cb(null, `${new Date().toISOString()}${file.originalname}`)
  },
})

// file validation
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/peg' || file.mimetype === 'image/png')
    cb(null, true)
  else cb({ message: 'unsupported file format' }, false)
}

const uploadMulter = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
})

module.exports = uploadMulter
