import { Router } from 'express'
const router = Router()
import * as pickUpLocationController from '../controller/pickUpLocation'
import { getUserFromJWT } from '../middleware'

/**
 * /user/...
 */
router.use(getUserFromJWT)

router.get('/', pickUpLocationController.findAll)
router.get('/:id', pickUpLocationController.findById)

export default router
