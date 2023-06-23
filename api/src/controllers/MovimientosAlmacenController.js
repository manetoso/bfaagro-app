import MOVIMIENTOS_ALMACEN from '../models/MovimientosAlmacen.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'

const createMovimientoAlmacen = async (req = request, res = response) => {
  try {
    const { MOVIMIENTO, FECHA, PRODUCTOS } = req.body
    const MovimientoAlmacen = { MOVIMIENTO, FECHA, PRODUCTOS }

    const actionDB = await MOVIMIENTOS_ALMACEN.create(MovimientoAlmacen)
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(res)
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

export { createMovimientoAlmacen, findMovimientosAlmacen, deleteMovimientoAlmacen, updateMovimientoAlmacen }
