import {
  findProcesos,
  findInProcessAndPending,
  createProceso,
  deleteProceso,
  updateStatusProceso,
  updateProceso
} from '../controllers/ProcesosController.js'
import { Router } from 'express'
import { validateStockToProcess, validateStatusChange } from '../middlewares/Index.js'

const router = Router()

router.get('/', [], findProcesos)
router.get('/proccess_pending', [], findInProcessAndPending)
router.post('/', [validateStockToProcess], createProceso)
router.put('/:idProceso', [], updateProceso)
router.put('/editar_estado/:idProceso', [validateStatusChange], updateStatusProceso)
router.delete('/:idProceso', [], deleteProceso)

export default router
