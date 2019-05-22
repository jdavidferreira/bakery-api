import mongoose from 'mongoose'
import moment from 'moment'
const Order = mongoose.model('Order')
const Customer = mongoose.model('Customer')
import State from '../model/_State.mjs'

export async function findAll(req, res) {
  const from = req.query.from

  let orders = []

  switch (from) {
    case 'today': {
      const startToday = moment().startOf('day')
      const endToday = moment().endOf('day')

      orders = await Order.find({
        dueDate: {
          $gte: startToday.toDate(),
          $lte: endToday.toDate()
        }
      })
        .populate('pickUpLocation')
        .populate('customer')
        .populate('items.product')
      break
    }
    case 'week': {
      const startTomorrow = moment()
        .add(1, 'day')
        .startOf('day')
      const endSunday = moment()
        .day(7)
        .endOf('day')

      orders = await Order.find({
        dueDate: {
          $gte: startTomorrow.toDate(),
          $lte: endSunday.toDate()
        }
      })
        .populate('pickUpLocation')
        .populate('customer')
        .populate('items.product')
      break
    }
    case 'upcoming': {
      const startNextMonday = moment()
        .day(8)
        .startOf('day')

      orders = await Order.find({
        dueDate: {
          $gte: startNextMonday.toDate()
        }
      })
        .populate('pickUpLocation')
        .populate('customer')
        .populate('items.product')
      break
    }
    default:
      orders = await Order.find()
        .populate('pickUpLocation')
        .populate('customer')
        .populate('items.product')
      break
  }

  res.json(orders)
}

export async function findById(req, res) {
  let order = await Order.findOne({ _id: req.params.id })

  res.json(order)
}

export async function create(req, res) {
  let customer = await Customer.findOne({ name: req.body.name })

  if (!customer) {
    customer = await Customer.create({
      name: req.body.name,
      phone: req.body.phone,
      details: req.body.details
    })
  }

  const order = await Order.create({
    dueDate: req.body.dueDate,
    customer: customer.id,
    state: State.NEW,
    pickUpLocation: req.body.pickUpLocation,
    items: req.body.items,
    history: [
      {
        createdBy: res.locals.user.id,
        newState: State.NEW,
        comment: 'Order placed'
      }
    ]
  })

  res.json(order)
}

export async function update(req, res) {
  const order = {
    dueDate: req.body.dueDate,
    state: req.body.status,
    pickUpLocation: req.body.pickUpLocation,
    items: JSON.parse(req.body.items)
  }

  let updated = await Order.updateOne(
    { _id: req.params.id },
    {
      $set: order,
      $push: {
        history: {
          date: Date.now,
          createdBy: req.user.id,
          newState: req.body.status,
          comment: req.body.comment
        }
      }
    }
  )

  res.json(updated)
}
