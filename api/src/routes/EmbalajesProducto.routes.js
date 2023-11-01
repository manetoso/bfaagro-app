import {
  findEmbalajesProducto,
  createEmbalajeProducto,
  deleteEmbalajeProducto,
  updateEmbalajeProducto
} from '../controllers/EmbalajesProductoController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findEmbalajesProducto)
router.post('/', [validateJWT, validateRol, validateFields], createEmbalajeProducto)
router.put('/:idEmbalajeProducto', [validateJWT, validateRol, validateFields], updateEmbalajeProducto)
router.delete('/:idEmbalajeProducto', [validateJWT, validateRol, validateFields], deleteEmbalajeProducto)

export default router
