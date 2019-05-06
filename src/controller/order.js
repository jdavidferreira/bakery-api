import { model } from 'mongoose'
const Order = model('Order')
const Customer = model('Customer')
import State from '../model/_State'

export async function findAll(req, res) {
  let orders = await Order.find()

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
    items: JSON.parse(req.body.items),
    history: [
      {
        date: Date.now,
        createdBy: req.user.id,
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
