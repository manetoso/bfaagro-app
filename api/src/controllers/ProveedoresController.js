import PROVEEDORES from '../models/Proveedores.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'

const createProveedor = async (req = request, res = response) => {
    try {
        const {
            NOMBRE_EMPRESA,
            AGENTE,
            NUMERO_TELEFONO,
            TIPO_PROVEEDOR 
        } = req.body
        const proveedor = {
            NOMBRE_EMPRESA,
            AGENTE,
            NUMERO_TELEFONO,
            TIPO_PROVEEDOR
        }

        const actionDB = await PROVEEDORES.create(proveedor)
        return serverOkMessage(res, actionDB, 201)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const findProveedores = async (req = request, res = response) => {
    try {
        const actionDB = await PROVEEDORES.find().sort({ createdAt: -1 })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const updateProveedor = async (req = request, res = response) => {
    try {
        const id = req.params.idProveedor
        const data = req.body
        const actionDB = await PROVEEDORES.findByIdAndUpdate(id, data, {
            new: true
        })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const deleteProveedor = async (req = request, res = response) => {
    try {
        const id = req.params.idProveedor
        const actionDB = await PROVEEDORES.findByIdAndDelete(id)
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

export { createProveedor, findProveedores, deleteProveedor, updateProveedor }
