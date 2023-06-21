import PAGOS from '../models/Pagos.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'

const createPago = async (req = request, res = response) => {
    try {
        const { ID_PROVEEDOR, ID_CUENTAxPAGAR, FOLIO, FECHA_PAGO, CANTIDAD_PAGADA, PROVEEDOR, OBSERVACIONES } = req.body
        const pago = { ID_PROVEEDOR, ID_CUENTAxPAGAR, FOLIO, FECHA_PAGO, CANTIDAD_PAGADA, PROVEEDOR, OBSERVACIONES }

        const actionDB = await PAGOS.create(pago)
        return serverOkMessage(res, actionDB, 201)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const findPagos = async (req = request, res = response) => {
    try {
        const actionDB = await PAGOS.find()
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const updatePago = async (req = request, res = response) => {
    try {
        const id = req.params.idPago
        const data = req.body
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
        const actionDB = await PAGOS.findByIdAndDelete(id)
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

export { createPago, findPagos, deletePago, updatePago }
