import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'
import { ALMACENES, CLIENTES, TIPOS_DOCUMENTOS } from '../models/Index.js'

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
    const actionDB = await ALMACENES.find().sort({ createdAt: -1 })
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

const createAlmacenCliente = async (cliente = CLIENTES) => {
  try {
    const almacenType = await TIPOS_DOCUMENTOS.findOne({
      "TIPO_DOCUMENTO": "TIPO_ALMACEN",
      "VALOR": "CLIENTES"
    })
    const newAlmacen = {
      "NOMBRE_ALMACEN": cliente._id,
      "TIPO_ALMACEN": {
        "ID_TIPO_ALMACEN": almacenType._id,
        "TIPO_ALMACEN": almacenType.VALOR
      }
    }
    const almacenCliente = await ALMACENES.create(newAlmacen)
    return almacenCliente
  } catch (error) {
    console.log(error);
  }
}

const getAlmacenByIdCliente = async (idCliente = '') => {
  try {
    const almacen = await ALMACENES.findOne({ NOMBRE_ALMACEN: idCliente })
    if(almacen){
      return almacen
    }else{
      return new Error
    }
  } catch (error) {
    console.log(error);
  }
}

export { createAlmacen, findAlmacenes, deleteAlmacen, updateAlmacen, createAlmacenCliente, getAlmacenByIdCliente }
