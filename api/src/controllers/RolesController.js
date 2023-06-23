import { ROLES } from '../models/Index.js'
import { request, response } from 'express'


const createRol = async (req = request, res = response) => {
    try {
        const { ROL } = req.body
        const rol = { ROL }

        const actionDB = await USUARIOS.create(rol)
        return serverOkMessage(res, actionDB, 201)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const findRoles = async (req = request, res = response) => {
    try {
        const actionDB = await ROLES.find().sort({ createdAt: -1 })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const updateRol = async (req = request, res = response) => {
    try {
        const id = req.params.idRol
        const data = req.body
        const actionDB = await ROLES.findByIdAndUpdate(id, data, {
            new: true
        })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const deleteRol = async (req = request, res = response) => {
    try {
        const id = req.params.idRol
        const actionDB = await ROLES.findByIdAndDelete(id)
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

export { createRol, findRoles, deleteRol, updateRol }
