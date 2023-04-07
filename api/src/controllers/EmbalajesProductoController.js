import EMBALAJES_PRODUCTO from '../models/Embalajes_Producto.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'

const createEmbalajeProducto = async (req = request, res = response) => {
  try {
    const { PRODUCTO, PRODUCTO_EMBALAJADO, EMBALAJE_PRODUCTO } = req.body
    const formulate = {
      PRODUCTO,
      PRODUCTO_EMBALAJADO,
      EMBALAJE_PRODUCTO
    }

    const actionDB = await EMBALAJES_PRODUCTO.create(formulate)
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(res, error)
  }
}
const findEmbalajesProducto = async (req = request, res = response) => {
  try {
    const actionDB = await EMBALAJES_PRODUCTO.find()
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}
const updateEmbalajeProducto = async (req = request, res = response) => {
  try {
    const id = req.params.idEmbalajeProducto
    const data = req.body
    const actionDB = await EMBALAJES_PRODUCTO.findByIdAndUpdate(id, data, {
      new: true
    })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}
const deleteEmbalajeProducto = async (req = request, res = response) => {
  try {
    const id = req.params.idEmbalajeProducto
    const actionDB = await EMBALAJES_PRODUCTO.findByIdAndDelete(id)
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

export {
  createEmbalajeProducto,
  findEmbalajesProducto,
  updateEmbalajeProducto,
  deleteEmbalajeProducto
}
