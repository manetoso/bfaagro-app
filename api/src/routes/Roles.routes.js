import { createRol, findRoles, updateRol, deleteRol } from '../controllers/RolesController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findRoles)
router.post('/', [], createRol)
router.put('/:idRol', [], updateRol)
router.delete('/:idRol', [], deleteRol)

export default router