import { findLotes_Productos, deleteLote_Producto, updateLote_Producto, createLote } from '../controllers/Lotes_ProductosController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findLotes_Productos)
router.post('/', [validateJWT, validateRol, validateFields], createLote)
router.put('/:idLote_Producto', [validateJWT, validateRol, validateFields], updateLote_Producto)
router.delete('/:idLote', [validateJWT, validateRol, validateFields], deleteLote_Producto)

export default router
