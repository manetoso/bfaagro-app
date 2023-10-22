import { findListasPrecio, createListaPrecio, deleteListaPrecio, updateListaPrecio, getListasPrecioByIdProduct } from '../controllers/Listas_PrecioController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findListasPrecio)
router.get('/:idProducto', [validateJWT, validateRol, validateFields], getListasPrecioByIdProduct)
router.post('/', [validateJWT, validateRol, validateFields], createListaPrecio)
router.put('/:idListaPrecio', [validateJWT, validateRol, validateFields], updateListaPrecio)
router.delete('/:idListaPrecio', [validateJWT, validateRol, validateFields], deleteListaPrecio)

export default router
