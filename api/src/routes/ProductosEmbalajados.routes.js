import { findProductosEmbalajados, createProductoEmbalajado, deleteProductoEmbalajado, updateProductoEmbalajado } from '../controllers/ProductosEmbajadosController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findProductosEmbalajados)
router.post('/', [validateJWT, validateRol, validateFields], createProductoEmbalajado)
router.put('/:idProductoEmbalajado', [validateJWT, validateRol, validateFields], updateProductoEmbalajado)
router.delete('/:idProductoEmbalajado', [validateJWT, validateRol, validateFields], deleteProductoEmbalajado)

export default router
