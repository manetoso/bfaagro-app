import MOVIMIENTOS_ALMACEN from '../models/MovimientosAlmacen.js'
import PRODUCTOS from '../models/Productos.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'

const createMovimientoAlmacen = async (req = request, res = response) => {
  try {
    const { MOVIMIENTO, FECHA, PRODUCTOS } = req.body
    const MovimientoAlmacen = { MOVIMIENTO, FECHA, PRODUCTOS }

    const actionDB = await MOVIMIENTOS_ALMACEN.create(MovimientoAlmacen)
    await registerMovementAlmacen(MOVIMIENTO.MOVIMIENTO, PRODUCTOS)
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(error)
  }
}

const findMovimientosAlmacen = async (req = request, res = response) => {
  try {
    const actionDB = await MOVIMIENTOS_ALMACEN.find().sort({ createdAt: -1 })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const updateMovimientoAlmacen = async (req = request, res = response) => {
  try {
    const id = req.params.idMovimientoAlmacen
    const data = req.body
    const actionDB = await MOVIMIENTOS_ALMACEN.findByIdAndUpdate(id, data, {
      new: true
    })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const deleteMovimientoAlmacen = async (req = request, res = response) => {
  try {
    const id = req.params.idMovimientoAlmacen
    const actionDB = await MOVIMIENTOS_ALMACEN.findByIdAndDelete(id)
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const registerMovementAlmacen = async (movement = '', products = []) => {
  try {
    const typeMovement = typeMovementAlmacen(movement)
    for (const product of products) {
      const dbProduct = await PRODUCTOS.findById(product.ID_PRODUCTO).lean()
      dbProduct.CANTIDAD = dbProduct.CANTIDAD + ( product.CANTIDAD * typeMovement)
      await PRODUCTOS.findByIdAndUpdate(product.ID_PRODUCTO, {  CANTIDAD: dbProduct.CANTIDAD })
    }
  } catch (error) {
    console.log(error);
  }
}

const typeMovementAlmacen = (movement = '') => {
  try {
    switch (movement) {
      case 'ENTRADA':
        return 1
        break;
      case 'SALIDA':
        return -1
        break;
      default:
        return 0
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

export { createMovimientoAlmacen, findMovimientosAlmacen, deleteMovimientoAlmacen, updateMovimientoAlmacen }
