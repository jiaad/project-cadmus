const mongoose              = require('mongoose')
const bcrypt                = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name: {
		first: {
				type: String,
				required: [true, "Please enter your first name"]
		},
		last: {
			type: String,
			required: [true, "please enter your first name"]
		}
  },
    email: {
        type: String,
				required:  [true, "Please enter your email"],
				unique: [true, 'Email allready exists']
    },
    // dateOfBirth: {
    //     type: Date,
    //     required: [true, "Please choose your date of birth"]
    // },
    position: String,
    isActive: Boolean,
    dateJoined: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        select: false,
        minlength: [6, 'Password must be at least 6 characters']
    }//,
    //resetPasswordToken: String,
    //resetPasswordExpire: Date

},
{
    timestamps: true
}
)

userSchema.virtual('fullName').get(function(){
    return this.name.first + ' ' + this.name.last
})

// userSchema.pre('save', function (next) {
//     const SALT_WORK_FACTOR = 10
//     var user = this;
//     if (!user.isModified('password')) return next()
//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//         if (err) return next(err)
//         bcrypt.hash(user.password, salt, function(err, hash) {
//         if (err) return next(err)
//             // Store hash in your password DB.
//             user.password = hash
//             next()
//         })
//     })
// })

userSchema.method.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password , function (err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

// userSchema.post('save', function(error, doc, next) {
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

module.exports = mongoose.model('User', userSchema)