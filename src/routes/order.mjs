import express from 'express'
const router = express.Router()
import * as orderController from '../controller/order.mjs'
import { getUserFromJWT, checkOperationPermission } from '../middleware.mjs'

/**
 * /customer/...
 */
router.use(getUserFromJWT)
router.use(checkOperationPermission('order'))

router.get('/', orderController.findAll)
router.post('/', orderController.create)
router
  .route('/:id')
  .get(orderController.findById)
  .patch(orderController.update)

export default router
