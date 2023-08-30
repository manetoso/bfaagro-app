import ORDENES_COMPRAS from '../models/OrdenesCompra.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'
import { generateNewFolio } from '../helpers/FoliosGenerator.js'
import { createCuentaxPagarByOrdenCompra } from './Cuentas_por_PagarController.js'
import { createRegister, constructArrayProducts, updateRegisterByIdentificador } from './BitacoraProductosController.js'

const createOrdenCompra = async (req = request, res = response) => {
  try {
    const { PROVEEDOR, FECHA, ID_EMPRESA, PRODUCTOS, IVA_TOTAL, MONEDA, TOTAL, OBSERVACIONES, PERIODO } = req.body

    const FOLIO = await generateNewFolio('ORDEN')
    const ordenCompra = { FOLIO, PROVEEDOR, FECHA, ID_EMPRESA, PRODUCTOS, IVA_TOTAL, MONEDA, TOTAL }
    const actionDB = await ORDENES_COMPRAS.create(ordenCompra)
    await createCuentaxPagarByOrdenCompra(actionDB, OBSERVACIONES, PERIODO)
    // Bitacora 
    const products = constructArrayProducts(PRODUCTOS)
    const register = {
      "IDENTIFICADOR": actionDB._id,
      "PRODUCTOS": products,
      "MOVIMIENTO": "COMPRA"
    }
    await createRegister(register)
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(res, error)
  }
}

const findOrdenesCompra = async (req = request, res = response) => {
  try {
    const actionDB = await ORDENES_COMPRAS.find().sort({ createdAt: -1 })
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
    // Bitacora 
    const products = constructArrayProducts(data.PRODUCTOS)
    const register = {
      "IDENTIFICADOR": id,
      "PRODUCTOS": products,
      "MOVIMIENTO": "COMPRA"
    }
    console.log(register);
    await updateRegisterByIdentificador(id, register)
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
