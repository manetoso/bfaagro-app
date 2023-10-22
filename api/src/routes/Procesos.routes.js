import {
  findProcesos,
  findInProcessAndPending,
  createProceso,
  deleteProceso,
  updateStatusProceso,
  updateProceso
} from '../controllers/ProcesosController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'
import { validateStockToProcess, validateStatusChange } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findProcesos)
router.get('/proccess_pending', [validateJWT, validateRol, validateFields], findInProcessAndPending)
router.post('/', [validateStockToProcess], createProceso)
router.put('/:idProceso', [validateJWT, validateRol, validateFields], updateProceso)
router.put('/editar_estado/:idProceso', [validateStatusChange], updateStatusProceso)
router.delete('/:idProceso', [validateJWT, validateRol, validateFields], deleteProceso)

export default router
