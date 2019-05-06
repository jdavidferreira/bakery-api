import { Router } from 'express'
const router = Router()
import * as orderController from '../controller/order'
import { getUserFromJWT, checkOperationPermission } from '../middleware'

/**
 * /user/...
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
