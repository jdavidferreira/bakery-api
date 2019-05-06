import { Router } from 'express'
const router = Router()
import * as userController from '../controller/user'
import { getUserFromJWT, checkOperationPermission } from '../middleware'

/**
 * /user/...
 */
router.use(getUserFromJWT)
router.use(checkOperationPermission('user'))

router.get('/', userController.findAll)
router.post('/', userController.create)
router
  .route('/:id')
  .get(userController.findById)
  .patch(userController.update)
  .delete(userController.delete)

export default router
