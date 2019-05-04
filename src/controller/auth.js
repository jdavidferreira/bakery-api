import { model } from 'mongoose'
const User = model('User')
import fetch from 'node-fetch'
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

export async function google(req, res) {
  const code = req.body.code
  //exchange for access token
  let response = await fetch('https://www.googleapis.com/oauth2/v4/token', {
    method: 'POST',
    body: JSON.stringify({
      code: code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.CALLBACK_URI,
      grant_type: 'authorization_code'
    })
  })
  response = await response.json()
  //token response
  const accessToken = response.access_token
  const personFields = 'names,emailAddresses'

  let data = await fetch(
    `https://people.googleapis.com/v1/people/me?personFields=${personFields}&access_token=${accessToken}`
  )
  data = await data.json()

  const email = data.emailAddresses[0].value

  let user = await User.findOne({ email }) //get that user

  if (!user) {
    //if not existS
    const password = Math.random() //random password
      .toString(36)
      .slice(-8)
    user = await User.create({ email, password }) //create user
  }
  const auth_token = await jwtSign(
    { userId: user.id },
    process.env.SECRET_KEY,
    {
      expiresIn: '30m'
    }
  )
  res.json({ auth_token })
}
