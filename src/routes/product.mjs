import express from 'express'
const router = express.Router()
import * as productController from '../controller/product.mjs'
import { getUserFromJWT, checkOperationPermission } from '../middleware.mjs'

/**
 * /product/...
 */
router.use(getUserFromJWT)
router.use(checkOperationPermission('product'))

router.get('/', productController.findAll)
router.post('/', productController.create)
router
  .route('/:id')
  .get(productController.findById)
  .patch(productController.update)
  .delete(productController.delete)

export default router
