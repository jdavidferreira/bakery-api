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
  { collection: 'pick_up_location', versionKey: false }
)

PickUpLocationSchema.set('toObject', { virtuals: true }) // retrieve the "id" virtual when calling schema.toObject

//removes "_id" fields
PickUpLocationSchema.methods.toJSON = function() {
  const product = this.toObject()
  delete product._id
  return product
}

export default mongoose.model('PickUpLocation', PickUpLocationSchema)
