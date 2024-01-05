import { findLotes, deleteLote, updateLote, createLote } from '../controllers/LotesController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findLotes)
router.post('/', [validateJWT, validateRol, validateFields], createLote)
router.put('/:idLote', [validateJWT, validateRol, validateFields], updateLote)
router.delete('/:idLote', [validateJWT, validateRol, validateFields], deleteLote)

export default router
