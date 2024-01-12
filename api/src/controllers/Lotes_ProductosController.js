import { request, response } from 'express'
import { LOTES_PRODUCTOS, LOTES } from '../models/Index.js'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'

const createLote_Producto = async (lote_producto) => {
  try {
    await LOTES_PRODUCTOS.create(lote_producto)
  } catch (error) {
    return console.log(error)
  }
}

const findLotes_Productos = async (req = request, res = response) => {
  try {
    const actionDB = await LOTES_PRODUCTOS.find().sort({ createdAt: -1 })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const updateLote_Producto = async (req = request, res = response) => {
  try {
    const id = req.params.idLote_Producto
    const data = req.body
    const actionDB = await LOTES_PRODUCTOS.findByIdAndUpdate(id, data, {
      new: true
    })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const deleteLote_Producto = async (req = request, res = response) => {
  try {
    const id = req.params.idLote_Producto
    const actionDB = await LOTES_PRODUCTOS.findByIdAndDelete(id)
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const constructLoteProducto = async (producto= {}, cantidad= 0) => {
  try {
    const lote = await LOTES.findOne({ ID_PRODUCTO: producto._id })
    let fecha = new Date()
    fecha.setHours(fecha.getHours() - 6)
    let fechaCorta = fecha.toISOString().substring(0, 10).replace(/-/g, '')
    const loteProducto = {
      LOTE: `${lote.SERIE}${fechaCorta}${lote.CONSECUTIVO}`,
      PRODUCTO: {
        ID_PRODUCTO: producto._id,
        NOMBRE_PRODUCTO: producto.NOMBRE_PRODUCTO,
        UNIDAD_MEDIDA: producto.UNIDAD_MEDIDA,
        CANTIDAD: cantidad,
        ALMACEN: {
          ID_ALMACEN: producto.ALMACEN.ID_ALMACEN,
          NOMBRE_ALMACEN: producto.ALMACEN.NOMBRE_ALMACEN
        }
      }
    }
    return loteProducto
  } catch (error) {
    return null
  }
}

export {
  createLote_Producto,
  findLotes_Productos,
  deleteLote_Producto,
  updateLote_Producto,
  constructLoteProducto
}
