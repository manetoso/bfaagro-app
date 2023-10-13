import { findCuentasxCobrar, deleteCuentaxCobrar, updateCuentaxCobrar } from '../controllers/Cuentas_por_CobrarController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findCuentasxCobrar)
router.put('/:idCuentaxCobrar', [validateJWT, validateRol, validateFields], updateCuentaxCobrar)
router.delete('/:idCuentaxCobrar', [validateJWT, validateRol, validateFields], deleteCuentaxCobrar)

export default router
