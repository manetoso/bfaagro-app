import { findFormulas, createFormula, updateFormula, deleteFormula } from '../controllers/FormulasController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findFormulas)
router.post('/', [], createFormula)
router.put('/:idFormula', [], updateFormula)
router.delete('/:idFormula', [], deleteFormula)

export default router
