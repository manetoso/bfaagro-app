import { findOrdenesCompra, createOrdenCompra, deleteOrdenCompra, updateOrdenCompra, productsByCompras } from '../controllers/OrdenesCompraController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findOrdenesCompra)
router.get('/cantidadproductocomprado', [], productsByCompras)
router.post('/', [], createOrdenCompra)
router.put('/:idOrdenCompra', [], updateOrdenCompra)
router.delete('/:idOrdenCompra', [], deleteOrdenCompra)

export default router
