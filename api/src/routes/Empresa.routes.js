import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'
import { createEmpresa, deleteEmpresa, findEmpresa, updateEmpresa } from '../controllers/EmpresaController.js'
const router = Router()

router.get('/',[validateJWT, validateRol, validateFields], findEmpresa)
router.post('/',[validateJWT, validateRol, validateFields], createEmpresa)
router.put('/:idEmpresa',[validateJWT, validateRol, validateFields], updateEmpresa)
router.delete('/:idEmpresa',[validateJWT, validateRol, validateFields], deleteEmpresa)

export default router