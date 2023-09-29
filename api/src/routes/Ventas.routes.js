import { findVentas, createVenta, deleteVenta, updateVenta, findVentas_Detalles, productsByVentas } from '../controllers/VentasController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findVentas)
router.get('/ventasdetalle', [], findVentas_Detalles)
router.get('/cantidadproductovendido', [], productsByVentas)
router.post('/', [], createVenta)
router.put('/:idVenta', [], updateVenta)
router.delete('/:idVenta', [], deleteVenta)

export default router
