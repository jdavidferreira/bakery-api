import mongoose from 'mongoose'

const PickUpLocationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  { collection: 'pickUpLocation', versionKey: false }
)

export default mongoose.model('PickUpLocation', PickUpLocationSchema)
