import { findRegisters, findRegisterByMovement, deleteRegister } from '../controllers/BitacoraProductosController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findRegisters)
router.get('/movement/:movement', [], findRegisterByMovement)
router.delete('/:idRegister', [], deleteRegister)

export default router
