import { findProveedores, createProveedor, deleteProveedor, updateProveedor } from '../controllers/ProveedoresController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findProveedores)
router.post('/', [], createProveedor)
router.put('/:idProveedor', [], updateProveedor)
router.delete('/:idProveedor', [], deleteProveedor)

export default router
