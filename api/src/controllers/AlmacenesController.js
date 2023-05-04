import ALMACENES from '../models/Almacenes.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'

const createAlmacen = async (req = request, res = response) => {
  try {
    const { NOMBRE_ALMACEN, TIPO_ALMACEN } = req.body
    const almacen = {
      NOMBRE_ALMACEN,
      TIPO_ALMACEN
    }

    const actionDB = await ALMACENES.create(almacen)
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const findAlmacenes = async (req = request, res = response) => {
  try {
    const actionDB = await ALMACENES.find()
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const updateAlmacen = async (req = request, res = response) => {
  try {
    const id = req.params.idAlmacen
    const data = req.body
    const actionDB = await ALMACENES.findByIdAndUpdate(id, data, {
      new: true
    })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const deleteAlmacen = async (req = request, res = response) => {
  try {
    const id = req.params.idAlmacen
    const actionDB = await ALMACENES.findByIdAndDelete(id)
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

export { createAlmacen, findAlmacenes, deleteAlmacen, updateAlmacen }
