/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { isEmail } from 'validator'

const userSchema = new mongoose.Schema(
  {
    name: {
      first: {
        type: String,
        required: [true, 'Please enter your first name'],
      },
      last: {
        type: String,
        required: [true, 'Please enter your last name'],
      },
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: [true, 'Email allready exists'],
      validate: [isEmail, 'invalid email'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    socialMediaHandles: {
      // https://mongoosejs.com/docs/schematypes.html#string-validators MAP
      type: Map,
      of: String,
      // eslint-disable-next-line object-shorthand
      validate: function (map) {
        // eslint-disable-next-line no-restricted-syntax
        for (const pseudo of map.values()) {
          if (pseudo.startsWith('http://') || pseudo.startsWith('https://')) {
            throw new Error(`Handle ${pseudo} must not be a URL`)
          }
        }
        return true
      },
    },
    // dateOfBirth: {
    //     type: Date,
    //     required: [true, "Please choose your date of birth"]
    // },
    position: {
      type: String,
      required: [true, 'Please enter your position'],
    },
    isActive: {
      type: Boolean,
      // default: true,
      required: [true, 'Please enter your status'],
    },
    dateJoined: {
      type: Date,
      default: Date.now,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      // select: false,
      minlength: [6, 'Password must be at least 6 characters'],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
)

userSchema.virtual('fullName').get(function () {
  return `${this.name.first} ${this.name.last}`
})

userSchema.pre('save', async function (next) {
  const saltRounds = await bcrypt.genSalt(10)
  if (!this.isModified('password')) return next()
  const hashedPassword = await bcrypt.hash(this.password, saltRounds)
  this.password = hashedPassword
  next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  const res = await bcrypt.compare(candidatePassword, this.password)
  return res
}

// Match user entered password to hashed password in database
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

userSchema.methods.signJWT = function () {
  const ALGO = 'RS256'
  return jwt.sign(
    { id: this._id, fullName: this.fullName },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  )
}

userSchema.methods.generateResetPassword = function async() {
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
  return resetToken
}

// userSchema.pre('save', () => {
//   this.socialMediaHandles
// })

userSchema.pre('/^find/', function (next) {
  console.log('*****___********** : PRE FIND MEYHOD CALLED')
  next()
})

// userSchema.methods.signedJwtToken = function () {
//   return jwt.sign({ id: this._id}, process.env.JWT_SECRET,{
//       expiresIn: process.env.JWT_EXPIRE
//   })
// }
// userSchema.post('save', function(error, doc, next) {
//   if (error.name === 'MongoError' && error.code === 11000) {
//     next(new Error('There was a duplicate key error'));
//   } else {
//     next();
//   }
// });

/// /// TEST
/*
// fetch user and test password verification
User.findOne({ username: 'jmar777' }, function(err, user) {
    if (err) throw err;

    // test a matching password
    user.comparePassword('Password123', function(err, isMatch) {
        if (err) throw err;
        console.log('Password123:', isMatch); // -&gt; Password123: true
    });

    // test a failing password
    user.comparePassword('123Password', function(err, isMatch) {
        if (err) throw err;
        console.log('123Password:', isMatch); // -&gt; 123Password: false
    });
});
 */

module.exports = mongoose.model('User', userSchema)
