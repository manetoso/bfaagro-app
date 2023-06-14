import ORDENES_COMPRAS from '../models/OrdenesCompra.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'

const createOrdenCompra = async (req = request, res = response) => {
  try {
    const { PROVEEDOR ,FECHA ,ID_EMPRESA ,PRODUCTOS ,IVA ,TOTAL } = req.body
    const ordenCompra = { PROVEEDOR ,FECHA ,ID_EMPRESA ,PRODUCTOS ,IVA ,TOTAL }

    const actionDB = await ORDENES_COMPRAS.create(ordenCompra)
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const findOrdenesCompra = async (req = request, res = response) => {
  try {
    const actionDB = await ORDENES_COMPRAS.find()
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const updateOrdenCompra = async (req = request, res = response) => {
  try {
    const id = req.params.idOrdenCompra
    const data = req.body
    const actionDB = await ORDENES_COMPRAS.findByIdAndUpdate(id, data, {
      new: true
    })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const deleteOrdenCompra = async (req = request, res = response) => {
  try {
    const id = req.params.idOrdenCompra
    const actionDB = await ORDENES_COMPRAS.findByIdAndDelete(id)
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

export { createOrdenCompra, findOrdenesCompra, deleteOrdenCompra, updateOrdenCompra }
