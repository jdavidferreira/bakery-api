import jwt from 'jsonwebtoken'
import RBAC from 'easy-rbac'
import roles from './roles.mjs'
const rbac = new RBAC(roles)
import User from './model/User.mjs'

export async function getUserFromJWT(req, res, next) {
  const authToken = req.token

  if (authToken) {
    try {
      const jwtPayload = await jwt.verify(authToken, process.env.SECRET_KEY)
      const userId = jwtPayload.user.id
      console.log('userId = ', userId)
      const user = await User.findById(userId)
      console.log('user = ', user)
      res.locals.user = user
      console.log('res.locals.user = ', res.locals.user)
      next()
    } catch (error) {
      res.status(401).json({ error: 'Invalid authentication token' })
    }
  } else {
    res.status(401).json({ error: 'Not authentication token found' })
  }
}

export function mongoErrorHandler(error, req, res, next) {
  let code = 400
  let message = 'Unknown error'

  switch (error.name) {
    case 'ValidationError':
      //this just prevent "[Collection's name] validation failed:" part of the error.message default
      message = Object.keys(error.errors)
        .map(e => `${error.errors[e].path} : ${error.errors[e].message}`)
        .join(', ')
      break
    case 'MongoError':
      if (error.code === 11000) {
        code = 409
        message = 'Already exists in database'
      } else {
        message = error.message
      }
      break
    case 'MulterError':
      message = error.message
      console.error(error)
      break
    default:
      message = error.message
      next(error)
      break
  }

  res.status(code).json({ message })
}

export function checkOperationPermission(operation) {
  return async function(req, res, next) {
    console.log(res.locals.user)
    const role = res.locals.user.role

    if (!role) {
      const err = new Error('User not found')
      err.nam = 'ApiError'
      next(err)
    }

    const isAllowed = await rbac.can(role, operation)

    if (isAllowed) {
      next()
    } else {
      const err = new Error('Unauthorized access')
      err.nam = 'ApiError'
      next(err)
    }
  }
}
