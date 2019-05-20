import mongoose from 'mongoose'
import moment from 'moment'
const Product = mongoose.model('Product')

export async function findAll(req, res) {
  const from = req.query.from

  let products = []

  switch (from) {
    case 'today': {
      const startToday = moment().startOf('day')
      const endToday = moment().endOf('day')

      products = await Product.find({
        dueDate: {
          $gte: startToday.toDate(),
          $lte: endToday.toDate()
        }
      })
      break
    }
    case 'week': {
      const startTomorrow = moment()
        .add(1, 'day')
        .startOf('day')
      const endSunday = moment()
        .day(7)
        .endOf('day')

      products = await Product.find({
        dueDate: {
          $gte: startTomorrow.toDate(),
          $lte: endSunday.toDate()
        }
      })
      break
    }
    case 'upcoming': {
      const startNextMonday = moment()
        .day(8)
        .startOf('day')

      products = await Product.find({
        dueDate: {
          $gte: startNextMonday.toDate()
        }
      })
      break
    }
    default:
      products = await Product.find()
      break
  }

  res.json(products)
}

export async function findById(req, res) {
  let product = await Product.findOne({ _id: req.params.id })

  res.json(product)
}

export async function create(req, res) {
  const product = {
    name: req.body.name,
    price: req.body.price
  }

  let created = await Product.create(product)

  res.json(created)
}

export async function update(req, res) {
  const product = {
    name: req.body.name,
    price: req.body.price
  }

  let updated = await Product.updateOne(
    { _id: req.params.id },
    { $set: product }
  )

  res.json(updated)
}

const _delete = async (req, res) => {
  await Product.deleteOne({ id: req.params.id })
  res.status(204).json()
}

export { _delete as delete }
