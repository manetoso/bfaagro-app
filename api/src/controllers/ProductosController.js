import PRODUCTOS from '../models/Productos.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'
import { nextConsecutivoLoteByIdProducto } from './LotesController.js'
import { LOTES } from '../models/Index.js'

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
    const actionDB = await PRODUCTOS.find().sort({ createdAt: -1 }).sort({ createdAt: -1 })
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

const fixProductosByType = async (req = request, res = response) => {
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
    await PRODUCTOS.updateMany(
      { 'TIPO_PRODUCTO.ID_TIPO_PRODUCTO': id },
      { 'TIPO_PRODUCTO': { 'ID_TIPO_PRODUCTO': '64821e39e4a8e8a2779409b8', 'TIPO_PRODUCTO': 'PRODUCTO' } },
      // { 'TIPO_PRODUCTO': { 'ID_TIPO_PRODUCTO': '643e2ae605593b141f3ec205', 'TIPO_PRODUCTO': 'PRODUCTO TERMINADO' } },
      { multi: true }
    )
    console.log(actionDB)
    return serverOkMessage(res, actionDB)
  } catch (error) {
    console.log(error)
    return serverErrorMessage(res)
  }
}

const createProductoInAlmacen = async (product = {}, almacen, cantidad) => {
  try {
    const { NOMBRE_PRODUCTO, UNIDAD_MEDIDA, TIPO_PRODUCTO } = product
    const producto = {
      NOMBRE_PRODUCTO,
      "CANTIDAD": cantidad,
      UNIDAD_MEDIDA,
      "CANTIDAD_MINIMA": 0,
      TIPO_PRODUCTO,
      "ALMACEN":{
        "ID_ALMACEN": almacen._id,
        "NOMBRE_ALMACEN": almacen.NOMBRE_ALMACEN
      }
    }
    await PRODUCTOS.create(producto)
  } catch (error) {
    console.log(error);
  }
}

const updateLotesProducto = async( idProducto = 0, lote = '', cantidad = 0, cantidadVeces = 1 ) => {
  try {
    const objLote = {
      LOTE: lote,
      CANTIDAD: cantidad * cantidadVeces
    }
    const objLoteDB = await PRODUCTOS.findById(idProducto)
    objLoteDB.LOTES.push(objLote)
    await PRODUCTOS.findByIdAndUpdate(idProducto, objLoteDB, { new: true })
    await nextConsecutivoLoteByIdProducto(idProducto, lote)
  } catch (error) {
    console.log(error);
  }
}

const decrementLotesProducto = async( lotes = []) => {
  try {
    lotes.forEach(async (lote) => {
      const productoSaved = await PRODUCTOS.find({'LOTES.LOTE': lote.LOTE})
      productoSaved.LOTES.filter((loteSaved) => loteSaved.LOTE == lote.LOTE).map((objeto) => {
        objeto.CANTIDAD -= lote.CANTIDAD
        return objeto;
      });
      PRODUCTOS.findByIdAndUpdate(productoSaved._id, productoSaved)
    })
  } catch (error) {
    console.log(error);
  }
}

export {
  createProducto,
  findProductos,
  deleteProducto,
  updateProducto,
  findProductosByType,
  fixProductosByType,
  createProductoInAlmacen,
  updateLotesProducto,
  decrementLotesProducto
}

