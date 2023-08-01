import { findCuentasxCobrar, deleteCuentaxCobrar, updateCuentaxCobrar } from '../controllers/Cuentas_por_CobrarController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findCuentasxCobrar)
router.put('/:idCuentaxCobrar', [], updateCuentaxCobrar)
router.delete('/:idCuentaxCobrar', [], deleteCuentaxCobrar)

export default router
