const mongoose = require('mongoose')
const User = mongoose.model('User')

export async function findAll(req, res) {
  let users = await User.find()

  res.json(users)
}

export async function findById(req, res) {
  let user = await User.findOne({ _id: req.params.id })

  res.json(user)
}

export async function create(req, res) {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  })

  res.status(200).json(user)
}

export async function update(req, res) {
  await User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      }
    }
  )

  res.status(204).end()
}

const _delete = async function(req, res) {
  await User.deleteOne({ id: req.params.id })
  res.status(204).json()
}

export { _delete as delete }
