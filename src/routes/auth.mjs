import express from 'express'
const router = express.Router()
import * as auth from '../controller/auth.mjs'

/**
 * /auth/...
 */
router.post('/token', auth.authToken)

export default router
