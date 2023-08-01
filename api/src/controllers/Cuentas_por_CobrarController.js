import Cuentas_por_Cobrar from '../models/Cuentas_por_Cobrar.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'
import { generateNewFolio } from '../helpers/FoliosGenerator.js'

const findCuentasxCobrar = async (req = request, res = response) => {
  try {
    const actionDB = await Cuentas_por_Cobrar.find().sort({ createdAt: -1 })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const updateCuentaxCobrar = async (req = request, res = response) => {
  try {
    const id = req.params.idCuentaxCobrar
    const data = req.body
    const actionDB = await Cuentas_por_Cobrar.findByIdAndUpdate(id, data, {
      new: true
    })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const deleteCuentaxCobrar = async (req = request, res = response) => {
  try {
    const id = req.params.idCuentaxCobrar
    const actionDB = await Cuentas_por_Cobrar.findByIdAndDelete(id)
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}
const createCuentaxCobrarByVenta = async (ID_VENTA, CLIENTES, FOLIO_VENTA, FECHA_VENCIMIENTO, ESTADO, TOTAL_VENTA, TOTAL_PAGADO, SALDO) => {
  try {
    const FOLIO_CXC = await generateNewFolio('CXC')
    const cuentasxCobrar = {
      ID_VENTA,
      CLIENTES,
      FOLIO_VENTA,
      FOLIO_CXC,
      FECHA_VENCIMIENTO,
      TOTAL_VENTA,
      TOTAL_PAGADO,
      SALDO,
      ESTADO
    }
    await Cuentas_por_Cobrar.create(cuentasxCobrar)
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

export { createCuentaxCobrarByVenta, findCuentasxCobrar, deleteCuentaxCobrar, updateCuentaxCobrar }
