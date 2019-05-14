import mongoose from 'mongoose'
const User = mongoose.model('User')
import jwt from 'jsonwebtoken'

export async function authToken(req, res) {
  const user = await User.authenticate(req.body.email, req.body.password)

  if (user) {
    const authToken = await jwt.sign({ user }, process.env.SECRET_KEY, {
      expiresIn: '5h'
    })
    res.json({ authToken })
  } else {
    res
      .status(400)
      .json({ error: 'Authentication failed. Wrong email or password.' })
  }
}
