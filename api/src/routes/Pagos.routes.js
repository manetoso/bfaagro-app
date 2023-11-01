import { findPagos, createPago, deletePago, updatePago } from '../controllers/PagosController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findPagos)
router.post('/', [validateJWT, validateRol, validateFields], createPago)
router.put('/:idPago', [validateJWT, validateRol, validateFields], updatePago)
router.delete('/:idPago', [validateJWT, validateRol, validateFields], deletePago)

export default router
