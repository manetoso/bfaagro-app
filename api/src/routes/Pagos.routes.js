import { findPagos, createPago, deletePago, updatePago } from '../controllers/PagosController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findPagos)
router.post('/', [], createPago)
router.put('/:idPago', [], updatePago)
router.delete('/:idPago', [], deletePago)

export default router
