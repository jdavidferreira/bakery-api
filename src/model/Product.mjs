import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { collection: 'product', versionKey: false }
)

ProductSchema.set('toObject', { virtuals: true }) // retrieve the "id" virtual when calling schema.toObject

//removes "_id" fields
ProductSchema.methods.toJSON = function() {
  const product = this.toObject()
  delete product._id
  return product
}

export default mongoose.model('Product', ProductSchema)
