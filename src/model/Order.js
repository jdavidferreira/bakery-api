import mongoose from 'mongoose'

const State = {
  NEW: 'New',
  READY: 'Ready',
  CONFIRMED: 'Confirmed',
  DELIVERED: 'Delivered',
  PROBLEM: 'Problem',
  CANCELLED: 'Cancelled',
  values: function() {
    const obj = Object.values(this)
    obj.length--
    return obj
  }
}

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
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, default: 1, min: 1 },
        comment: {
          type: String,
          trim: true
        }
      }
    ],
    history: [
      {
        date: {
          type: Date,
          default: Date.now,
          min: Date.now
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

export default mongoose.model('Order', OrderSchema)
