import { Router } from 'express'
const router = Router()
import * as customerController from '../controller/customer'
import { getUserFromJWT, checkOperationPermission } from '../middleware'

/**
 * /user/...
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
