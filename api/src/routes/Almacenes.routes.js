import { findAlmacenes, createAlmacen, deleteAlmacen, updateAlmacen } from '../controllers/AlmacenesController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findAlmacenes)
router.post('/', [], createAlmacen)
router.put('/:idAlmacen', [], updateAlmacen)
router.delete('/:idAlmacen', [], deleteAlmacen)

export default router
