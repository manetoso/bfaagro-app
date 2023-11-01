import { findRegisters, findRegisterByMovement, deleteRegister } from '../controllers/BitacoraProductosController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findRegisters)
router.get('/movement/:movement', [validateJWT, validateRol, validateFields], findRegisterByMovement)
router.delete('/:idRegister', [validateJWT, validateRol, validateFields], deleteRegister)

export default router
