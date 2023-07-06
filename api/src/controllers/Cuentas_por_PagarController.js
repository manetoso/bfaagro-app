import Cuentas_por_Pagar from '../models/Cuentas_por_Pagar.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'
import { generateNewFolio } from '../helpers/FoliosGenerator.js'

const createCuentaxPagar = async (req = request, res = response) => {
  try {
    const { ID_ORDEN_COMPRA, PROVEEDOR, FECHA_EMISION, FOLIO_ORDEN, CANTIDAD, FECHA_PAGO, CANTIDAD_PAGADA, SALDO = CANTIDAD, OBSERVACIONES } = req.body
    const FOLIO_CXP = await generateNewFolio('CXP')
    const cuentasxPagar = { ID_ORDEN_COMPRA, PROVEEDOR, FECHA_EMISION, FOLIO_ORDEN, FOLIO_CXP, CANTIDAD, FECHA_PAGO, CANTIDAD_PAGADA, SALDO, OBSERVACIONES }
    console.log(cuentasxPagar);

    const actionDB = await Cuentas_por_Pagar.create(cuentasxPagar)
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(res, error)
  }
}

const findCuentasxPagar = async (req = request, res = response) => {
  try {
    const actionDB = await Cuentas_por_Pagar.find().sort({ createdAt: -1 })
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
const createCuentaxPagarByOrdenCompra = async (ordenCompra = {}, OBSERVACIONES, PERIODO) => {
  try {
    const { _id, PROVEEDOR, FECHA, FOLIO, TOTAL, MONEDA } = ordenCompra

    const FOLIO_CXP = await generateNewFolio('CXP')
    const FECHA_PAGO = calculatePayDateByPeriodo(PERIODO)
    const cuentasxPagar = {
      'ID_ORDEN_COMPRA': _id,
      'PROVEEDOR': {
        'ID_PROVEEDOR': PROVEEDOR.ID_PROVEEDOR,
        'NOMBRE_EMPRESA': PROVEEDOR.NOMBRE_EMPRESA,
        'AGENTE': PROVEEDOR.AGENTE
      },
      'FECHA_EMISION': FECHA,
      'FOLIO_ORDEN': FOLIO,
      FOLIO_CXP,
      'CANTIDAD': TOTAL,
      'FECHA_PAGO': FECHA_PAGO,
      'SALDO': TOTAL,
      'OBSERVACIONES': OBSERVACIONES,
      'MONEDA': MONEDA,
    }
    await Cuentas_por_Pagar.create(cuentasxPagar)
    return true
  } catch (error) {
    console.log(error)
  }
}

const calculatePayDateByPeriodo = (PERIODO = Number) => {
  try {
    let todayDate = new Date(Date.now())
    todayDate.setHours(todayDate.getHours() - 6);
    if (PERIODO != 0 && PERIODO != undefined) {
      const newDate = new Date(todayDate.setDate(todayDate.getDate() + PERIODO))
      return newDate
    } else {
      return todayDate
    }
  } catch (error) {
    console.log(error);
  }
}

export { createCuentaxPagar, findCuentasxPagar, deleteCuentaxPagar, updateCuentaxPagar, createCuentaxPagarByOrdenCompra }
