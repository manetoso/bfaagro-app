import PRODUCTOS_EMBALAJADOS from '../models/Productos_Embalajados.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'

const createProductoEmbalajado = async (req = request, res = response) => {
  try {
    const { PRODUCTO, PRODUCTO_EMBALAJADO, EMBALAJE_PRODUCTO, EXISTENCIA } =
      req.body
    const productoEmbalajado = {
      PRODUCTO,
      PRODUCTO_EMBALAJADO,
      EMBALAJE_PRODUCTO,
      EXISTENCIA
    }

    const actionDB = await PRODUCTOS_EMBALAJADOS.create(productoEmbalajado)
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(res, error)
  }
}
const findProductosEmbalajados = async (req = request, res = response) => {
  try {
    const actionDB = await PRODUCTOS_EMBALAJADOS.find()
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}
const updateProductoEmbalajado = async (req = request, res = response) => {
  try {
    const id = req.params.idProductoEmbalajado
    const data = req.body
    const actionDB = await PRODUCTOS_EMBALAJADOS.findByIdAndUpdate(id, data, {
      new: true
    })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}
const deleteProductoEmbalajado = async (req = request, res = response) => {
  try {
    const id = req.params.idProductoEmbalajado
    await PRODUCTOS_EMBALAJADOS.findByIdAndDelete(id)
    return serverOkMessage(res)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

export {
  createProductoEmbalajado,
  findProductosEmbalajados,
  updateProductoEmbalajado,
  deleteProductoEmbalajado
}
