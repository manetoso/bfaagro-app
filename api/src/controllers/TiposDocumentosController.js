import TIPOS_DOCUMENTOS from '../models/TiposDocumentos.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'

const createTipoDocumento = async (req = request, res = response) => {
  try {
    const { TIPO_DOCUMENTO, VALOR } = req.body
    const typeDocument = {
      TIPO_DOCUMENTO,
      VALOR
    }

    const actionDB = await TIPOS_DOCUMENTOS.create(typeDocument)
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(res, error)
  }
}

const findTiposDocumentos = async (req = request, res = response) => {
  try {
    const actionDB = await TIPOS_DOCUMENTOS.find()
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const findTiposDocumentosByType = async (req = request, res = response) => {
  try {
    const type = req.params.tipoDocumentos
    const actionDB = await TIPOS_DOCUMENTOS.find({
      TIPO_DOCUMENTO: 'TIPO_' + type.toUpperCase()
    })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const updateTipoDocumento = async (req = request, res = response) => {
  try {
    const id = req.params.idTipoDocumento
    const data = req.body
    const actionDB = await TIPOS_DOCUMENTOS.findByIdAndUpdate(id, data, {
      new: true
    })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const deleteTipoDocumento = async (req = request, res = response) => {
  try {
    const id = req.params.idTipoDocumento
    await TIPOS_DOCUMENTOS.findByIdAndDelete(id)
    return serverOkMessage(res)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

export {
  createTipoDocumento,
  findTiposDocumentos,
  findTiposDocumentosByType,
  deleteTipoDocumento,
  updateTipoDocumento
}
