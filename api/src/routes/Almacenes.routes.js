import { findAlmacenes, createAlmacen, deleteAlmacen, updateAlmacen } from '../controllers/AlmacenesController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findAlmacenes)
router.post('/', [validateJWT, validateRol, validateFields], createAlmacen)
router.put('/:idAlmacen', [validateJWT, validateRol, validateFields], updateAlmacen)
router.delete('/:idAlmacen', [validateJWT, validateRol, validateFields], deleteAlmacen)

export default router
