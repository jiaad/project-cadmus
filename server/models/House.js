import mongoose from 'mongoose'
import geocoder from '../utils/geocoder'
// const { Schema } = mongoose.Schema

const houseSchema = new mongoose.Schema(
  {
    _userId: mongoose.Types.ObjectId,
    description: {
      type: String,
    },
    homeType: {
      type: String,
      required: [true, 'Please provide type of your home'],
    },
    totalOccupancy: {
      type: Number,
      required: [true, 'Please provide max occupancy'],
    },
    bedrooms: {
      type: Number,
      required: [true, 'Please provide maximum badrooms'],
    },
    address: {
      address: {
        type: String,
        required: [true, 'Please provide your street name'],
      },
      city: {
        type: String,
        required: [true, 'Please provide your city name'],
      },
      zipcode: {
        type: String,
        required: [true, 'Please provide your zipcode'],
      },
      country: {
        type: String,
        required: [true, 'Please provide your country name'],
      },
    },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        // required: true,
      },
      coordinates: {
        type: [Number],
        // required: true,
        index: '2dsphere',
      },
      formattedAddress: String,
      country: String,
      state: String,
      city: String,
      zipCode: String,
    },

    hasTv: {
      type: Boolean,
      required: [true, 'Please provide your tv information'],
    },
    hasKitchen: {
      type: Boolean,
      required: [true, 'Please provide your kitchen information'],
    },
    hasAirConditionner: {
      type: Boolean,
      required: [true, 'Please provide your air conditionner information'],
    },
    hasHeating: {
      type: Boolean,
      required: [true, 'Please provide your heater information'],
    },
    hasInternet: {
      type: Boolean,
      required: [true, 'Please provide your wifi information'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide your price information'],
    },
    meta: {
      votes: Number,
      favs: Number,
      guests: Number,
      bedrooms: Number,
      beds: Number,
      baths: Number,
    },
    // services: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Service',
    //   },
    // ],
    isOccupied: Boolean,
    // comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    isHiden: Boolean,
    averageRating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    ratingsQuantity: Number,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

houseSchema.pre('save', async function (next) {
  const res = await geocoder.geocode({
    address: this.address.address,
    country: this.address.country,
    zipcode: this.address.zipcode,
    city: this.address.city,
  })

  console.log(this.address, res)
  this.location = {
    type: 'Point',
    coordinates: [res[0].latitude, res[0].longitude],
    formattedAddress: res[0].formattedAddress,
    country: this.address.country,
    state: res[0].stateCode,
    city: res[0].city,
    zipCode: res[0].zipcode,
  }
  Object.keys(this.address).forEach((key) => {
    this.address[key] = undefined
  })
  next()
})

houseSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'house',
  localField: '_id',
})

module.exports = mongoose.model('House', houseSchema)
