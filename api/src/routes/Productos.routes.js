import { findProductos, createProducto, updateProducto, deleteProducto, findProductosByType, fixProductosByType } from '../controllers/ProductosController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findProductos)
router.post('/', [], createProducto)
router.put('/:idProducto', [], updateProducto)
router.delete('/:idProducto', [], deleteProducto)
router.get('/:idTipoProducto', [], findProductosByType)
router.post('/fix/:idTipoProducto', [], fixProductosByType)

export default router
