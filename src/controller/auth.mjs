import mongoose from 'mongoose'
const User = mongoose.model('User')
import jwt from 'jsonwebtoken'

export async function authToken(req, res) {
  const user = await User.authenticate(req.body.email, req.body.password)

  if (user) {
    const authToken = await jwt.sign(
      { userId: user.id },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h'
      }
    )
    res.json({ authToken })
  } else {
    res
      .status(400)
      .json({ error: 'Authentication failed. Wrong email or password.' })
  }
}
