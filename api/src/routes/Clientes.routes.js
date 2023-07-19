import { findClientes, createCliente, deleteCliente, updateCliente } from '../controllers/ClientesController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findClientes)
router.post('/', [], createCliente)
router.put('/:idCliente', [], updateCliente)
router.delete('/:idCliente', [], deleteCliente)

export default router
