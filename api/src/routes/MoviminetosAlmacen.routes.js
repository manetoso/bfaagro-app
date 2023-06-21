import { findMovimientosAlmacen, createMovimientoAlmacen, deleteMovimientoAlmacen, updateMovimientoAlmacen } from '../controllers/MovimientosAlmacenController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findMovimientosAlmacen)
router.post('/', [], createMovimientoAlmacen)
router.put('/:idMovimientoAlmacen', [], updateMovimientoAlmacen)
router.delete('/:idMovimientoAlmacen', [], deleteMovimientoAlmacen)

export default router
