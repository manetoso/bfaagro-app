import { response, request } from 'express'
import jwt from 'jsonwebtoken'
import { USUARIOS } from '../models/Index.js'

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('jwt-token')
    if (!token) {
        return res.status(401).json({
            msg: 'Se requiere un token para la petición'
        })
    }
    try {
        //Retorna el payload
        const { id } = jwt.verify(token, process.env.SECRETKEY)
        //leer el usuario que corresponde al uid
        const userSaved = await USUARIOS.findById(id)
        const isAdmin = userSaved.ROLES.find((role) => role.ROL == 'ADMIN')
        if(isAdmin) {
            req.isAdmin = true
        }
        if (!userSaved) {
            return res.status(401).json({
                msg: 'Token no Valido - token de usuario no existe'
            })
        }

        //Añadimos información a la request para posteriores validaciones
        req.authUser = userSaved

        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no Valido'
        })
    }

}

export { validateJWT }