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

export default mongoose.model('Product', ProductSchema)
