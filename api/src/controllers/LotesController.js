import { request, response } from 'express'
import { LOTES } from '../models/Index.js'
import { serverOkMessage } from './ControllerGlobal.js'

const createLote = async (req = request, res = response) => {
  try {
    const { SERIE, CONSECUTIVO, ID_PRODUCTO, ULTIMO_REALIZADO } = req.body
    const lote = {
      SERIE, CONSECUTIVO, ID_PRODUCTO, ULTIMO_REALIZADO
    }
    const actionDB = await LOTES.create(lote)
    const loteCreado = await LOTES.findById(actionDB._id).populate('ID_PRODUCTO')
    return serverOkMessage(res, loteCreado, 201)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const findLotes = async (req = request, res = response) => {
  try {
    const actionDB = await LOTES.find().sort({ createdAt: -1 }).populate('ID_PRODUCTO')
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const updateLote = async (req = request, res = response) => {
  try {
    const id = req.params.idLote
    const data = req.body
    const actionDB = await LOTES.findByIdAndUpdate(id, data, {
      new: true
    })
    const loteActualizado = await LOTES.findById(actionDB._id).populate('ID_PRODUCTO')
    return serverOkMessage(res, loteActualizado)
  } catch (error) {
    return serverErrorMessage(res)
  }
}
const nextConsecutivoLote = async (idLote) => {
  try {
    const lote = await LOTES.findOne(idLote)
    const nextConsecutivo = {
      "CONSECUTIVO": lote.CONSECUTIVO++
    }
    const actionDB = await LOTES.findByIdAndUpdate(idLote, { CONSECUTIVO: nextConsecutivo }, {
      new: true
    })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const deleteLote = async (req = request, res = response) => {
  try {
    const id = req.params.idLote
    const actionDB = await LOTES.findByIdAndDelete(id)
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const constructLoteProducto = async (idProducto) => {
  try {
    const lote = await LOTES.findOne({ ID_PRODUCTO: idProducto })

    let fecha = new Date()
    fecha.setHours(fecha.getHours() - 6)
    let fechaCorta = fecha.toISOString().substring(0, 10).replace(/-/g, '')
    
    const loteProducto = `${lote.SERIE}${fechaCorta}${lote.CONSECUTIVO}`
    return loteProducto
  } catch (error) {
    return null
  }
}

export { createLote, findLotes, deleteLote, updateLote, nextConsecutivoLote, constructLoteProducto }
