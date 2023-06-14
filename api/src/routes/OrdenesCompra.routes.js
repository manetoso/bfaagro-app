import { findOrdenesCompra, createOrdenCompra, deleteOrdenCompra, updateOrdenCompra } from '../controllers/OrdenesCompraController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findOrdenesCompra)
router.post('/', [], createOrdenCompra)
router.put('/:idOrdenCompra', [], updateOrdenCompra)
router.delete('/:idOrdenCompra', [], deleteOrdenCompra)

export default router
