import {Router} from 'express'
import { createEmpresa, deleteEmpresa, findEmpresa, updateEmpresa } from '../controllers/EmpresaController.js'
const router = Router()

router.get('/',[], findEmpresa)
router.post('/',[], createEmpresa)
router.put('/:idEmpresa',[], updateEmpresa)
router.delete('/:idEmpresa',[], deleteEmpresa)

export default router