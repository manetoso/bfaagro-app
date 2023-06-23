import { USUARIOS } from '../models/Index.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'
import { generateJWT } from '../helpers/Index.js'
import bcryptjs from 'bcryptjs'

const createUsuario = async (req = request, res = response) => {
    try {
        const { USUARIO, CONTRASENA } = req.body
        const usuario = { USUARIO, CONTRASENA }

        const salt = bcryptjs.genSaltSync()
        usuario.CONTRASENA = bcryptjs.hashSync(CONTRASENA, salt)

        const actionDB = await USUARIOS.create(usuario)
        return serverOkMessage(res, actionDB, 201)
    } catch (error) {
        console.log(error);
        return serverErrorMessage(res, error)
    }
}

const findUsuario = async (req = request, res = response) => {
    try {
        const actionDB = await USUARIOS.find().sort({ createdAt: -1 })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}
const login = async (req = request, res = response) => {
    try {
        const { USUARIO, CONTRASENA } = req.body

        const actionDB = await USUARIOS.findOne({ USUARIO }).lean()
        if (actionDB) {
            const validPassword = bcryptjs.compareSync(CONTRASENA, actionDB.CONTRASENA)
            if (!validPassword) {
                return serverErrorMessage(res, '¡ERROR!. Revisa tus Credenciales!', 404)
            } else {
                // Generamos el jwt
                const JWT = await generateJWT(actionDB._id)

                const { USUARIO, ROLES } = actionDB
                return serverOkMessage(res, {USUARIO, ROLES, JWT})
            }
        } else {
            return serverErrorMessage(res, '¡ERROR!. Revisa tus Credenciales!', 404)
        }
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const updateUsuario = async (req = request, res = response) => {
    try {
        const id = req.params.idUsuario
        const data = req.body
        const actionDB = await USUARIOS.findByIdAndUpdate(id, data, {
            new: true
        })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const deleteUsuario = async (req = request, res = response) => {
    try {
        const id = req.params.idUsuario
        const actionDB = await USUARIOS.findByIdAndDelete(id)
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

export { createUsuario, findUsuario, login, deleteUsuario, updateUsuario }
