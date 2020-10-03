import mongoose from 'mongoose'
import House from './House'

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating cannot be below 1.0'],
      max: [5, 'Rating cannot be above 5.0'],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'required must gave an author'],
    },
    house: {
      type: mongoose.Types.ObjectId,
      ref: 'House',
      required: [true, 'review must have an house'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

reviewSchema.index({ user: 1, house: 1 }, { unique: true })

reviewSchema.statics.calcAverageRantings = async function (houseId) {
  const calc = await this.aggregate([
    { $match: { house: houseId } },
    {
      $group: {
        _id: '$house',
        ratingsQuantity: { $sum: 1 },
        averageRating: { $sum: '$rating' },
      },
    },
  ])
  console.log('Review : calc :', calc[0], calc)
  try {
    await House.findByIdAndUpdate(houseId, {
      ratingsQuantity: calc[0].ratingsQuantity,
      averageRating: calc[0].averageRating,
    })
  } catch (e) {
    console.log('THERE IS PROBLEME DURING REVIEW CALC RATING : ', e)
  }
}

reviewSchema.post('save', function () {
  // this points to current review
  this.constructor.calcAverageRantings(this.house)
  // next()
})
reviewSchema.pre('remove', function () {
  this.constructor.calcAverageRantings(this.house)
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
