import EMPRESAS from '../models/Empresas.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'

const createEmpresa = async (req = request, res = response) => {
    try {
        const { EMPRESA, DIRECCION } = req.body
        const empresa = { EMPRESA, DIRECCION }

        const actionDB = await EMPRESAS.create(empresa)
        return serverOkMessage(res, actionDB, 201)
    } catch (error) {
        console.log(error);
        return serverErrorMessage(res)
    }
}

const findEmpresa = async (req = request, res = response) => {
    try {
        const actionDB = await EMPRESAS.find()
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const updateEmpresa = async (req = request, res = response) => {
    try {
        const id = req.params.idEmpresa
        const data = req.body
        const actionDB = await EMPRESAS.findByIdAndUpdate(id, data, {
            new: true
        })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const deleteEmpresa = async (req = request, res = response) => {
    try {
        const id = req.params.idEmpresa
        const actionDB = await EMPRESAS.findByIdAndDelete(id)
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

export { createEmpresa, findEmpresa, deleteEmpresa, updateEmpresa }
