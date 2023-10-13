import { findFormulas, createFormula, updateFormula, deleteFormula } from '../controllers/FormulasController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findFormulas)
router.post('/', [validateJWT, validateRol, validateFields], createFormula)
router.put('/:idFormula', [validateJWT, validateRol, validateFields], updateFormula)
router.delete('/:idFormula', [validateJWT, validateRol, validateFields], deleteFormula)

export default router
