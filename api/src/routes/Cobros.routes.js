import { findCobros, createCobros, deleteCobro, updateCobro } from '../controllers/CobrosControlles.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findCobros)
router.post('/', [validateJWT, validateRol, validateFields], createCobros)
router.put('/:idCobro', [validateJWT, validateRol, validateFields], updateCobro)
router.delete('/:idCobro', [validateJWT, validateRol, validateFields], deleteCobro)

export default router
