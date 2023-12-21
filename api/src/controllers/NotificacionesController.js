import { request, response } from 'express'

import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'
import { NOTIFICACIONES } from '../models/Index.js'
import { checkVencimientoCxC, checkVencimientoCxP } from '../helpers/Notificacion.js'

const createNotificacion = async (notificacion = {}) => {
    try {
        const actionDB = await NOTIFICACIONES.create(notificacion)
        return actionDB
    } catch (error) {
        console.log(error);
    }
}
const createNotificacionBySystem = async (req = request, res = response) => {
    try {
        const { NOTIFICAION, CATALOGO, VISTA } = req.body
        const notificacion = { NOTIFICAION, CATALOGO, VISTA }
        const actionDB = await NOTIFICACIONES.create(notificacion)
        return serverOkMessage(res, actionDB)
    } catch (error) {
        serverErrorMessage(res)
    }
}

const findNotificaciones = async (req = request, res = response) => {
    try {
        await checkVencimientoCxC()
        await checkVencimientoCxP()
        const actionDB = await NOTIFICACIONES.find({ VISTA: false }).sort({ createdAt: -1 })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const updateNotificacion = async (req = request, res = response) => {
    try {
        const id = req.params.idNotificacion
        const data = req.body
        const actionDB = await NOTIFICACIONES.findByIdAndUpdate(id, data, {
            new: true
        })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const deleteNotificacion = async (req = request, res = response) => {
    try {
        const id = req.params.idNotificacion
        const actionDB = await NOTIFICACIONES.findByIdAndDelete(id)
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}


const changeNotificacionVista = async (req = request, res = response) => {
    try {
        const id = req.params.idNotificacion
        const actionDB = await NOTIFICACIONES.findByIdAndUpdate(id, { VISTA: TRUE })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

export { createNotificacion, createNotificacionBySystem, findNotificaciones, deleteNotificacion, updateNotificacion, changeNotificacionVista }
