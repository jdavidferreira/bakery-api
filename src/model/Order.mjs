import mongoose from 'mongoose'
import mongooseSequence from 'mongoose-sequence'
const AutoIncrement = mongooseSequence(mongoose)
import State from './_State.mjs'

const OrderSchema = mongoose.Schema(
  {
    dueDate: {
      type: Date,
      required: true,
      min: Date.now
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    state: {
      type: String,
      enum: State.values(),
      default: State.NEW
    },
    pickUpLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PickUpLocation',
      required: true
    },
    items: [
      {
        _id: false,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, default: 1, min: 1 },
        details: {
          type: String,
          trim: true
        }
      }
    ],
    history: [
      {
        _id: false,
        date: {
          type: Date,
          default: Date.now
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        newState: {
          type: String,
          enum: State.values(),
          required: true
        },
        comment: {
          type: String,
          trim: true
        }
      }
    ]
  },
  { collection: 'order', versionKey: false }
)

OrderSchema.plugin(AutoIncrement, {
  inc_field: 'number',
  collection_name: 'order_counter'
})

OrderSchema.set('toObject', { virtuals: true }) // retrieve the "id" virtual when calling user.toObject

//removes "_id" fields
OrderSchema.methods.toJSON = function() {
  const order = this.toObject()
  delete order._id
  return order
}

export default mongoose.model('Order', OrderSchema)
