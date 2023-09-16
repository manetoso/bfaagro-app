import { findListasPrecio, createListaPrecio, deleteListaPrecio, updateListaPrecio, getListasPrecioByIdProduct } from '../controllers/Listas_PrecioController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findListasPrecio)
router.get('/:idProducto', [], getListasPrecioByIdProduct)
router.post('/', [], createListaPrecio)
router.put('/:idListaPrecio', [], updateListaPrecio)
router.delete('/:idListaPrecio', [], deleteListaPrecio)

export default router
