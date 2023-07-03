import { findCuentasxPagar, createCuentaxPagar, deleteCuentaxPagar, updateCuentaxPagar } from '../controllers/Cuentas_por_PagarController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findCuentasxPagar)
router.post('/', [], createCuentaxPagar)
router.put('/:idCuentaxPagar', [], updateCuentaxPagar)
router.delete('/:idCuentaxPagar', [], deleteCuentaxPagar)

export default router
