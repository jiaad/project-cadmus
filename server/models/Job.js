const mongoose = require(`mongoose`)
const Schema = mongoose.Schema
const { ObjectID } = Schema.Types

const jobSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter your title'],
  },
  description: {
    type: String,
    required: [true, 'Please enter your description'],
    maxlength: [500, "Description can't be more then 500 characters"],
  },
  benefits: {
    type: String,
    required: [true, 'Please enter your benefits'],
    maxlength: [500, "benefits can't be more then 500 characters"],
  },
  pluses: {
    type: String,
    required: [true, 'Please enter your pluses'],
    maxlength: [500, "Description can't be more then 500 characters"],
  },
  stacks: {
    type: String,
    required: [true, 'Please enter your technologies'],
  },
  recruitmentProcess: {
    type: String,
    required: [true, 'Please enter your recruitement process'],
    maxlength: [500, "Recuruitement can't be more then 500 characters"],
  },
  salary: {
    type: Number,
  },
  position: {
    type: String,
    required: [true, 'Please enter your contract'],
  },
  company: {
    // type: mongoose.Schema.Types.ObjectId,
    type: ObjectID,
    ref: 'Company',
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Job', jobSchema)
