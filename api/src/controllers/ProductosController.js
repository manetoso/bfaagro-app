import PRODUCTOS from '../models/Productos.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'

const createProducto = async (req = request, res = response) => {
  try {
    const { NOMBRE_PRODUCTO, CANTIDAD, UNIDAD_MEDIDA, CANTIDAD_MINIMA, TIPO_PRODUCTO, ALMACEN } =
      req.body
    const producto = {
      NOMBRE_PRODUCTO,
      CANTIDAD,
      UNIDAD_MEDIDA,
      CANTIDAD_MINIMA,
      TIPO_PRODUCTO,
      ALMACEN
    }
    const actionDB = await PRODUCTOS.create(producto)
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const findProductos = async (req = request, res = response) => {
  try {
    const actionDB = await PRODUCTOS.find().sort({ createdAt: -1 })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const updateProducto = async (req = request, res = response) => {
  try {
    const id = req.params.idProducto
    const data = req.body
    const actionDB = await PRODUCTOS.findByIdAndUpdate(id, data, {
      new: true
    })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const deleteProducto = async (req = request, res = response) => {
  try {
    const id = req.params.idProducto
    await PRODUCTOS.findByIdAndDelete(id)
    return serverOkMessage(res)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const findProductosByType = async (req = request, res = response) => {
  try {
    const id = req.params.idTipoProducto
    let actionDB = await PRODUCTOS.find({
      'TIPO_PRODUCTO.ID_TIPO_PRODUCTO': id
    })
    if (actionDB.length === 0) {
      actionDB = {
        ok: true,
        msg: 'No hay productos del tipo solicitado'
      }
    }
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

export {
  createProducto,
  findProductos,
  deleteProducto,
  updateProducto,
  findProductosByType
}
