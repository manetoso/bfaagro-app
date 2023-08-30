import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'
import { BITACORA_PRODUCTOS } from '../models/Index.js'

const createRegister = async (data) => {
    try {
        const actionDB = await BITACORA_PRODUCTOS.create(data)
    } catch (error) {
    }
}

const findRegisters = async (req = request, res = response) => {
    try {
        const actionDB = await BITACORA_PRODUCTOS.find().sort({ createdAt: -1 })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}
const findRegisterByMovement = async (req = request, res = response) => {
    try {
        const MOVIMIENTO = req.params.movement
        const actionDB = await BITACORA_PRODUCTOS.find({ MOVIMIENTO }).sort({ createdAt: -1 })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const updateRegisterByIdentificador = async (IDENTIFICADOR, register) => {
    try {
        console.log(register);
        const registerSaved = await BITACORA_PRODUCTOS.findOne({IDENTIFICADOR: IDENTIFICADOR})
        console.log(registerSaved);
        const actionDB = await BITACORA_PRODUCTOS.findByIdAndUpdate(registerSaved._id, register, {
            new: true
        })
        console.log(actionDB);
    } catch (error) {
        console.log(error);
    }
}

const deleteRegister = async (req = request, res = response) => {
    try {
        const id = req.params.idRegister
        const actionDB = await BITACORA_PRODUCTOS.findByIdAndDelete(id)
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const constructArrayProducts = (PRODUCTS) => {
    try {
        let products = []
        for(const product of PRODUCTS ) {
            const prod = {
                "ID_PRODUCTO": product.ID_PRODUCTO,
                "NOMBRE_PRODUCTO": product.NOMBRE_PRODUCTO,
                "CANTIDAD": product.CANTIDAD
            }
            products.push(prod)
        }
        return products
    } catch (error) {
        return error
    }
}

export { createRegister, findRegisters, findRegisterByMovement, updateRegisterByIdentificador, deleteRegister, constructArrayProducts }
