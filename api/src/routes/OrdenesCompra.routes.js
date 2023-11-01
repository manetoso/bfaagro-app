import { findOrdenesCompra, createOrdenCompra, deleteOrdenCompra, updateOrdenCompra, productsByCompras } from '../controllers/OrdenesCompraController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findOrdenesCompra)
router.get('/cantidadproductocomprado', [validateJWT, validateRol, validateFields], productsByCompras)
router.post('/', [validateJWT, validateRol, validateFields], createOrdenCompra)
router.put('/:idOrdenCompra', [validateJWT, validateRol, validateFields], updateOrdenCompra)
router.delete('/:idOrdenCompra', [validateJWT, validateRol, validateFields], deleteOrdenCompra)

export default router
