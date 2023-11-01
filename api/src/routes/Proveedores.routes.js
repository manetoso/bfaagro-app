import { findProveedores, createProveedor, deleteProveedor, updateProveedor } from '../controllers/ProveedoresController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findProveedores)
router.post('/', [validateJWT, validateRol, validateFields], createProveedor)
router.put('/:idProveedor', [validateJWT, validateRol, validateFields], updateProveedor)
router.delete('/:idProveedor', [validateJWT, validateRol, validateFields], deleteProveedor)

export default router
