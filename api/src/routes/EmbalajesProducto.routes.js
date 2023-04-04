import {
  findEmbalajesProducto,
  createEmbalajeProducto,
  deleteEmbalajeProducto,
  updateEmbalajeProducto
} from '../controllers/EmbalajesProductoController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findEmbalajesProducto)
router.post('/', [], createEmbalajeProducto)
router.put('/:idEmbalajeProducto', [], updateEmbalajeProducto)
router.delete('/:idEmbalajeProducto', [], deleteEmbalajeProducto)

export default router
