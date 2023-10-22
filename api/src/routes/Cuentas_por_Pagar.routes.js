import { findCuentasxPagar, createCuentaxPagar, deleteCuentaxPagar, updateCuentaxPagar } from '../controllers/Cuentas_por_PagarController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findCuentasxPagar)
router.post('/', [validateJWT, validateRol, validateFields], createCuentaxPagar)
router.put('/:idCuentaxPagar', [validateJWT, validateRol, validateFields], updateCuentaxPagar)
router.delete('/:idCuentaxPagar', [validateJWT, validateRol, validateFields], deleteCuentaxPagar)

export default router
