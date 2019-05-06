const express = require('express')
const router = express.Router()
const auth = require('../controller/auth')

/**
 * /auth/...
 */
router.post('/token', auth.authToken)

module.exports = router
