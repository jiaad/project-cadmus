import mongoose, { Schema } from 'mongoose'

const reservationSchema = new Schema(
  {
    _userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    _houseId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'House',
    },
    startDate: {
      type: Date,
      required: [true, 'Please select your start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please select your end date'],
    },
    price: {
      type: Number,
    },
    total: {
      type: Number,
    },
    isFinished: Boolean,
  },
  {
    timestamps: true,
  }
)

reservationSchema.pre('save', async function () {
  console.log('DATE BEFORE SAVZE ->', this.startDate)
  console.log('DATE BEFORE SAVZE ->', this.endDate)
  const startDate = this.startDate
  const endDate = this.endDate
  const diff = new Date(endDate.getTime() - startDate.getTime())
  const difference = diff.getUTCDate() - 1
  const total = difference * this.price
  console.log('DIFF -> :', difference)
  console.log('DIFF -> :', this.startDate)
  console.log('DIFF -> :', this.endDate)
  // eslint-disable-next-line no-return-assign
  this.total = total
})

module.exports = mongoose.model('Reservations', reservationSchema)
