import Cuentas_por_Pagar from '../models/Cuentas_por_Pagar.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'

const createCuentaxPagar = async (req = request, res = response) => {
  try {
    const { ID_PROVEEDOR, PROVEEDOR, FECHA_EMISION, FOLIO, CANTIDAD, FECHA_PAGO, CANTIDAD_PAGADA, SALDO, OBSERVACIONES } = req.body
    const cuentasxPagar = { ID_PROVEEDOR, PROVEEDOR, FECHA_EMISION, FOLIO, CANTIDAD, FECHA_PAGO, CANTIDAD_PAGADA, SALDO, OBSERVACIONES }

    const actionDB = await Cuentas_por_Pagar.create(cuentasxPagar)
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const findCuentasxPagar = async (req = request, res = response) => {
  try {
    const actionDB = await Cuentas_por_Pagar.find()
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const updateCuentaxPagar = async (req = request, res = response) => {
  try {
    const id = req.params.idCuentaxPagar
    const data = req.body
    const actionDB = await Cuentas_por_Pagar.findByIdAndUpdate(id, data, {
      new: true
    })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const deleteCuentaxPagar = async (req = request, res = response) => {
  try {
    const id = req.params.idCuentaxPagar
    const actionDB = await Cuentas_por_Pagar.findByIdAndDelete(id)
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

export { createCuentaxPagar, findCuentasxPagar, deleteCuentaxPagar, updateCuentaxPagar }
