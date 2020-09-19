const mongoose = require('mongoose')
const asyncHandler = require('../middleware/asyncHandler')
const connectDB = asyncHandler(async ()=> {
	const connect = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	// mongo console log
	console.log(`MONGODB CONNECTED SUCCESSFULLY: ${process.env.MONGO_URI}`)
})

module.exports = connectDB