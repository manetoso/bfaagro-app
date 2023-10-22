import { findMovimientosAlmacen, createMovimientoAlmacen, deleteMovimientoAlmacen, updateMovimientoAlmacen } from '../controllers/MovimientosAlmacenController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findMovimientosAlmacen)
router.post('/', [validateJWT, validateRol, validateFields], createMovimientoAlmacen)
router.put('/:idMovimientoAlmacen', [validateJWT, validateRol, validateFields], updateMovimientoAlmacen)
router.delete('/:idMovimientoAlmacen', [validateJWT, validateRol, validateFields], deleteMovimientoAlmacen)

export default router
