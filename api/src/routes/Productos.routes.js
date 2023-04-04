import { findProductos, createProducto, updateProducto, deleteProducto, findProductosByType } from '../controllers/ProductosController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findProductos)
router.post('/', [], createProducto)
router.put('/:idProducto', [], updateProducto)
router.delete('/:idProducto', [], deleteProducto)
router.get('/:idTipoProducto', [], findProductosByType)

export default router
