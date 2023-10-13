import { createRol, findRoles, updateRol, deleteRol } from '../controllers/RolesController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findRoles)
router.post('/', [validateJWT, validateRol, validateFields], createRol)
router.put('/:idRol', [validateJWT, validateRol, validateFields], updateRol)
router.delete('/:idRol', [validateJWT, validateRol, validateFields], deleteRol)

export default router