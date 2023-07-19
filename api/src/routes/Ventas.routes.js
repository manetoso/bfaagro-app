import { findVentas, createVenta, deleteVenta, updateVenta } from '../controllers/VentasController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findVentas)
router.post('/', [], createVenta)
router.put('/:idVenta', [], updateVenta)
router.delete('/:idVenta', [], deleteVenta)

export default router
