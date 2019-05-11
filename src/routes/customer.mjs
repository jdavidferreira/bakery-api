import express from 'express'
const router = express.Router()
import * as customerController from '../controller/customer.mjs'
import { getUserFromJWT, checkOperationPermission } from '../middleware.mjs'

/**
 * /customer/...
 */
router.use(getUserFromJWT)
router.use(checkOperationPermission('customer'))

router.get('/', customerController.findAll)
router.post('/', customerController.create)
router
  .route('/:id')
  .get(customerController.findById)
  .patch(customerController.update)
  .delete(customerController.delete)

export default router
