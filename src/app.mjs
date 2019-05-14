import express from 'express'
import 'express-async-errors' //prevents wrapping async functions for error handling
import bearerToken from 'express-bearer-token'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
})
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
)

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin: process.env.CORS_ORIGIN.split(' ')
  })
)

// Instanciate Models
import './model/User.mjs'
import './model/Customer.mjs'
import './model/Product.mjs'
import './model/PickUpLocation.mjs'
import './model/Order.mjs'

//Routes
import authRoute from './routes/auth.mjs'
import userRoute from './routes/user.mjs'
import customerRoute from './routes/customer.mjs'
import productRoute from './routes/product.mjs'
import pickUpLocationRoute from './routes/pickUpLocation.mjs'
import orderRoute from './routes/order.mjs'
app.use('/auth', authRoute)
app.use(bearerToken()) //extract authentication token to req.token
app.use('/user', userRoute)
app.use('/customer', customerRoute)
app.use('/product', productRoute)
app.use('/pick_up_location', pickUpLocationRoute)
app.use('/order', orderRoute)

import { mongoErrorHandler } from './middleware.mjs'
app.use(mongoErrorHandler)

export default app
