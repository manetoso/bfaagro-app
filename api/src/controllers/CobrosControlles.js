import COBROS from '../models/Cobros.js'
import Cuentas_por_Cobrar from '../models/Cuentas_por_Cobrar.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'
import { generateNewFolio } from '../helpers/FoliosGenerator.js'

const createCobros = async (req = request, res = response) => {
  try {
    const { ID_CUENTAxCOBRAR, FOLIO_CXC, ID_VENTA, FECHA_COBRO, CANTIDAD_COBRADA, CLIENTE } = req.body
    const FOLIO_COBRO = await generateNewFolio('COBRO')
    const cobro = {
      ID_CUENTAxCOBRAR, FOLIO_CXC, FOLIO_COBRO, ID_VENTA, FECHA_COBRO, CANTIDAD_COBRADA, CLIENTE
    }
    const actionDB = await COBROS.create(cobro)

    const updateCxC = await Cuentas_por_Cobrar.findById(ID_CUENTAxCOBRAR).lean()
    updateCxC.TOTAL_PAGADO += CANTIDAD_COBRADA
    updateCxC.SALDO -= CANTIDAD_COBRADA
    if (updateCxC.SALDO == 0) {
        updateCxC.ESTADO = 'PAGADO'
    }
    if(updateCxC.SALDO < 0){
        return serverErrorMessage(res, { msg: "El monto a cobrar es mayor al monto de deuda" }, 403)
    }
    await Cuentas_por_Cobrar.findByIdAndUpdate(updateCxC._id, { TOTAL_PAGADO: updateCxC.TOTAL_PAGADO, SALDO: updateCxC.SALDO, ESTADO: updateCxC.ESTADO })
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const findCobros = async (req = request, res = response) => {
  try {
    const actionDB = await COBROS.find().sort({ createdAt: -1 })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const updateCobro = async (req = request, res = response) => {
  try {
    const id = req.params.idCobro
    const data = req.body
    const cobro = await COBROS.findById(id)
    if (data.CANTIDAD_COBRADA != cobro.CANTIDAD_COBRADA && data.CANTIDAD_COBRADA != undefined) {
        const status = await recalculateCxC(cobro, data)
        if (!status) {
            return serverErrorMessage(res, { msg: "El monto a cobrar es mayor al monto de deuda" }, 403)
        }
    }
    const actionDB = await COBROS.findByIdAndUpdate(id, data, {
        new: true
    })
    return serverOkMessage(res, actionDB)
} catch (error) {
  console.log(error);
    return serverErrorMessage(res)
}
}

const deleteCobro = async (req = request, res = response) => {
  try {
    const id = req.params.idCobro
    const cobro = COBROS.findById(id)
    await recalculateCxC(cobro, 0)
    const actionDB = await COBROS.findByIdAndDelete(id)
    return serverOkMessage(res, actionDB)
} catch (error) {
    return serverErrorMessage(res)
}
}

const recalculateCxC = async (oldCobro = COBROS, newCobro = COBROS) => {
  try {
      let cxc = await Cuentas_por_Cobrar.findOne({ FOLIO_CXC: oldCobro.FOLIO_CXC }).lean()
      cxc.TOTAL_PAGADO = (cxc.TOTAL_PAGADO - oldCobro.CANTIDAD_COBRADA) + newCobro.CANTIDAD_COBRADA
      cxc.SALDO = cxc.TOTAL_VENTA - cxc.TOTAL_PAGADO
      if (cxc.SALDO == 0) {
          cxc.ESTADO = 'PAGADO'
      }
      if (cxc.SALDO < 0) {
          return false
      }
      await Cuentas_por_Cobrar.findByIdAndUpdate(cxc._id, { TOTAL_PAGADO: cxc.TOTAL_PAGADO, SALDO: cxc.SALDO, ESTADO: cxc.ESTADO })
      return true
  } catch (error) {
      console.log(error);
  }
}

export { createCobros, findCobros, deleteCobro, updateCobro }
