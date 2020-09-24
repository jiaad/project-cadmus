/* eslint-disable consistent-return */
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const companySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter your first name'],
    index: true,
    unique: [true, 'The name already exists'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your your email'],
    unique: [true, 'The name already exists'],
  },
  about: {
    type: String,
    required: [true, 'Please enter your informations'],
  },
  activities: {
    type: String,
    required: [true, 'Please enter your activities'],
  },
  profilePic: {
    type: String,
    default: 'not-photo.jpg',
  },
  coverPic: {
    type: String,
    default: 'no-cover-pic.jpg',
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    select: false,
    minlength: [6, 'Password must be at least 6 characters'],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

// userSchema.pre('save', function (next) {
// 	const SALT_WORK_FACTOR = 10
// 	var user = this;
// 	if (!user.isModified('password')) return next()
// 	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
// 			if (err) return next(err)
// 			bcrypt.hash(user.password, salt, function(err, hash) {
// 			if (err) return next(err)
// 					// Store hash in your password DB.
// 					user.password = hash
// 					next()
// 			})
// 	})
// })

companySchema.pre('save', async function (next) {
  const SALT_WORK_FACTOR = 10
  if (!this.isModified('password')) return next()
  const saltRounds = await bcrypt.genSalt(SALT_WORK_FACTOR)
  const hash = await bcrypt.hash(this.password, saltRounds)
  this.password = hash
  next()
})

companySchema.method.comparePassword = async function (candidatePassword) {
  const res = await bcrypt.compare(candidatePassword, this.password)
  return res
}

module.exports = mongoose.model('Company', companySchema)
