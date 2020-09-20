"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: [true, "Please enter your first name"]
    },
    last: {
      type: String,
      required: [true, "Please enter your last name"]
    }
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, 'Email allready exists']
  },
  // dateOfBirth: {
  //     type: Date,
  //     required: [true, "Please choose your date of birth"]
  // },
  position: {
    type: String,
    required: [true, "Please enter your position"]
  },
  isActive: {
    type: Boolean,
    required: [true, "Please enter your status"]
  },
  dateJoined: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    select: false,
    minlength: [6, 'Password must be at least 6 characters']
  } //,
  //resetPasswordToken: String,
  //resetPasswordExpire: Date

}, {
  timestamps: true
});
userSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
});
userSchema.pre('save', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(next) {
    var password, saltRounds, hashedPassword;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            password = this.password;
            saltRounds = 10;

            if (this.isModified('password')) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", next());

          case 4:
            _context.next = 6;
            return bcrypt.hash(password, saltRounds);

          case 6:
            hashedPassword = _context.sent;
            this.password = hashedPassword;
            next();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

userSchema.method.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}; // userSchema.post('save', function(error, doc, next) {
//   if (error.name === 'MongoError' && error.code === 11000) {
//     next(new Error('There was a duplicate key error'));
//   } else {
//     next();
//   }
// });
////// TEST

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


module.exports = mongoose.model('User', userSchema);