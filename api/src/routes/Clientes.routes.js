import { findClientes, createCliente, deleteCliente, updateCliente } from '../controllers/ClientesController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findClientes)
router.post('/', [validateJWT, validateRol, validateFields], createCliente)
router.put('/:idCliente', [validateJWT, validateRol, validateFields], updateCliente)
router.delete('/:idCliente', [validateJWT, validateRol, validateFields], deleteCliente)

export default router
