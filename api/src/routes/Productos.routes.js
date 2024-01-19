import { findProductos, createProducto, updateProducto, deleteProducto, findProductosByType, fixProductosByType } from '../controllers/ProductosController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [], findProductos)
router.post('/', [validateJWT, validateRol, validateFields], createProducto)
router.put('/:idProducto', [validateJWT, validateRol, validateFields], updateProducto)
router.delete('/:idProducto', [validateJWT, validateRol, validateFields], deleteProducto)
router.get('/:idTipoProducto', [validateJWT, validateRol, validateFields], findProductosByType)
router.post('/fix/:idTipoProducto', [validateJWT, validateRol, validateFields], fixProductosByType)

export default router
