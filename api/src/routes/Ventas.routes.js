import { Router } from 'express'
import { findVentas, createVenta, deleteVenta, updateVenta, findVentas_Detalles, productsByVentas } from '../controllers/VentasController.js'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findVentas)
router.get('/ventasdetalle', [validateJWT, validateRol, validateFields], findVentas_Detalles)
router.get('/cantidadproductovendido', [validateJWT, validateRol, validateFields], productsByVentas)
router.post('/', [validateJWT, validateRol, validateFields], createVenta)
router.put('/:idVenta', [validateJWT, validateRol, validateFields], updateVenta)
router.delete('/:idVenta', [validateJWT, validateRol, validateFields], deleteVenta)

export default router
