import mongoose from 'mongoose'
const PickUpLocation = mongoose.model('PickUpLocation')

export async function findAll(req, res) {
  let pickUpLocations = await PickUpLocation.find()

  res.json(pickUpLocations)
}

export async function findById(req, res) {
  let pickUpLocation = await PickUpLocation.findOne({ _id: req.params.id })

  res.json(pickUpLocation)
}
