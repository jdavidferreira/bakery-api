import { Router } from 'express'
const router = Router()
import * as orderController from '../controller/product'
import { getUserFromJWT, checkOperationPermission } from '../middleware'

/**
 * /user/...
 */
router.use(getUserFromJWT)
router.use(checkOperationPermission('product'))

router.get('/', orderController.findAll)
router.post('/', orderController.create)
router
  .route('/:id')
  .get(orderController.findById)
  .patch(orderController.update)
  .delete(orderController.delete)

export default router
