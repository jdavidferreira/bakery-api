import { model } from 'mongoose'
const User = model('User')
import { sign as jwtSign } from 'jsonwebtoken'

export async function authToken(req, res) {
  const user = await User.authenticate(req.body.email, req.body.password)

  if (user) {
    const authToken = await jwtSign(
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
