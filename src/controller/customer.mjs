import mongoose from 'mongoose'
const Customer = mongoose.model('Customer')

export async function findAll(req, res) {
  let customers = await Customer.find()

  res.json(customers)
}

export async function findById(req, res) {
  let customer = await Customer.findOne({ _id: req.params.id })

  res.json(customer)
}

export async function create(req, res) {
  const customer = {
    name: req.body.name,
    phone: req.body.phone,
    details: req.body.details
  }

  let created = await Customer.create(customer)

  res.json(created)
}

export async function update(req, res) {
  const customer = {
    name: req.body.name,
    phone: req.body.phone,
    details: req.body.details
  }

  let updated = await Customer.updateOne(
    { _id: req.params.id },
    { $set: customer }
  )

  res.json(updated)
}

const _delete = async (req, res) => {
  await Customer.deleteOne({ id: req.params.id })
  res.status(204).json()
}

export { _delete as delete }
