import PAGOS from '../models/Pagos.js'
import Cuentas_por_Pagar from '../models/Cuentas_por_Pagar.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'
import { generateNewFolio } from '../helpers/FoliosGenerator.js'

const createPago = async (req = request, res = response) => {
    try {
        const { ID_PROVEEDOR, ID_CUENTAxPAGAR, FOLIO_CXP, FECHA_PAGO, CANTIDAD_PAGADA, PROVEEDOR, OBSERVACIONES } = req.body
        const FOLIO_PAGO = await generateNewFolio('PAGO')
        const pago = { ID_PROVEEDOR, ID_CUENTAxPAGAR, FOLIO_CXP, FOLIO_PAGO, FECHA_PAGO, CANTIDAD_PAGADA, PROVEEDOR, OBSERVACIONES }
        const actionDB = await PAGOS.create(pago)
        const updateCxP = await Cuentas_por_Pagar.findOne({ FOLIO_CXP }).lean()
        updateCxP.CANTIDAD_PAGADA += CANTIDAD_PAGADA
        updateCxP.SALDO -= CANTIDAD_PAGADA
        if (updateCxP.SALDO == 0) {
            updateCxP.ESTADO = 'PAGADO'
        }
        if(updateCxP.SALDO < 0){
            return serverErrorMessage(res, { msg: "El monto a pagar es mayor al monto de deuda" }, 403)
        }
        await Cuentas_por_Pagar.findByIdAndUpdate(updateCxP._id, { CANTIDAD_PAGADA: updateCxP.CANTIDAD_PAGADA, SALDO: updateCxP.SALDO, ESTADO: updateCxP.ESTADO })
        return serverOkMessage(res, actionDB, 201)
    } catch (error) {
        console.log(error)
        return serverErrorMessage(res, error)
    }
}

const findPagos = async (req = request, res = response) => {
    try {
        const actionDB = await PAGOS.find().sort({ createdAt: -1 })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const updatePago = async (req = request, res = response) => {
    try {
        const id = req.params.idPago
        const data = req.body
        const pago = await PAGOS.findById(id)
        if (data.CANTIDAD_PAGADA != pago.CANTIDAD_PAGADA && data.CANTIDAD_PAGADA != undefined) {
            const status = await recalculateCxP(pago, data)
            if (!status) {
                return serverErrorMessage(res, { msg: "El monto a pagar es mayor al monto de deuda" }, 403)
            }
        }
        const actionDB = await PAGOS.findByIdAndUpdate(id, data, {
            new: true
        })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const deletePago = async (req = request, res = response) => {
    try {
        const id = req.params.idPago
        const pago = PAGOS.findById(id)
        await recalculateCxP(pago, 0)
        const actionDB = await PAGOS.findByIdAndDelete(id)
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const recalculateCxP = async (oldPago = PAGOS, newPago = PAGOS) => {
    try {
        let cxp = await Cuentas_por_Pagar.findOne({ FOLIO_CXP: oldPago.FOLIO_CXP }).lean()
        cxp.CANTIDAD_PAGADA = (cxp.CANTIDAD_PAGADA - oldPago.CANTIDAD_PAGADA) + newPago.CANTIDAD_PAGADA
        cxp.SALDO = cxp.CANTIDAD - cxp.CANTIDAD_PAGADA
        if (cxp.SALDO == 0) {
            cxp.ESTADO = 'PAGADO'
        }
        if (cxp.SALDO < 0) {
            return false
        }
        await Cuentas_por_Pagar.findByIdAndUpdate(cxp._id, { CANTIDAD_PAGADA: cxp.CANTIDAD_PAGADA, SALDO: cxp.SALDO, ESTADO: cxp.ESTADO })
        return true
    } catch (error) {
        console.log(error);
    }
}

export { createPago, findPagos, deletePago, updatePago }
