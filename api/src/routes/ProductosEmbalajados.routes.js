import { findProductosEmbalajados, createProductoEmbalajado, deleteProductoEmbalajado, updateProductoEmbalajado } from '../controllers/ProductosEmbajadosController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findProductosEmbalajados)
router.post('/', [], createProductoEmbalajado)
router.put('/:idProductoEmbalajado', [], updateProductoEmbalajado)
router.delete('/:idProductoEmbalajado', [], deleteProductoEmbalajado)

export default router
