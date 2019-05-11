import mongoose from 'mongoose'
const Product = mongoose.model('Product')

export async function findAll(req, res) {
  let products = await Product.find()

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
