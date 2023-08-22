import { findCobros, createCobros, deleteCobro, updateCobro } from '../controllers/CobrosControlles.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findCobros)
router.post('/', [], createCobros)
router.put('/:idCobro', [], updateCobro)
router.delete('/:idCobro', [], deleteCobro)

export default router
