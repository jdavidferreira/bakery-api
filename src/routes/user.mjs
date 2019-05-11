import express from 'express'
const router = express.Router()
import * as userController from '../controller/user.mjs'
import { getUserFromJWT, checkOperationPermission } from '../middleware.mjs'

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
