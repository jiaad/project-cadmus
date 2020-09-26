import mongoose from 'mongoose'

// const { Schema } = mongoose.Schema

const houseSchema = new mongoose.Schema(
  {
    _userId: mongoose.Types.ObjectId,
    description: {
      type: String,
    },
    meta: {
      votes: Number,
      favs: Number,
      guests: Number,
      bedrooms: Number,
      beds: Number,
      baths: Number,
    },
    services: {
      type: mongoose.Types.ObjectId,
    },
    isOccupied: Boolean,
    comments: [{ type: mongoose.Types.ObjectId }],
    isHiden: Boolean,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('House', houseSchema)
