import express from 'express'
const router = express.Router()
import * as pickUpLocationController from '../controller/pickUpLocation.mjs'
import { getUserFromJWT } from '../middleware.mjs'

/**
 * /pick_up_location/...
 */
router.use(getUserFromJWT)

router.get('/', pickUpLocationController.findAll)
router.get('/:id', pickUpLocationController.findById)

export default router
