import mongoose from 'mongoose'

const CustomerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    details: {
      type: String,
      trim: true
    }
  },
  { collection: 'customer', versionKey: false }
)

export default mongoose.model('Customer', CustomerSchema)
