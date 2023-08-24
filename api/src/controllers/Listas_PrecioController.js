import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'
import { LISTAS_PRECIO, PRODUCTOS, TIPOS_DOCUMENTOS } from '../models/Index.js'
import Listas_Precios from '../models/Listas_Precios.js'

const createListaPrecio = async (req = request, res = response) => {
    try {
        const { ID_PRODUCTO, PRECIO_UNITARIO, AUMENTO, PRECIO_FINAL, TIPO_LISTA } = req.body
        const listaPrecio = {
            ID_PRODUCTO, PRECIO_UNITARIO, AUMENTO, PRECIO_FINAL, TIPO_LISTA
        }

        const actionDB = await LISTAS_PRECIO.create(listaPrecio)
        return serverOkMessage(res, actionDB, 201)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const findListasPrecio = async (req = request, res = response) => {
    try {
        const actionDB = await LISTAS_PRECIO.find().sort({ createdAt: -1 })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const updateListaPrecio = async (req = request, res = response) => {
    try {
        const id = req.params.idListaPrecio
        const data = req.body
        const actionDB = await Listas_Precios.findByIdAndUpdate(id, data, {
            new: true
        })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const deleteListaPrecio = async (req = request, res = response) => {
    try {
        const id = req.params.idListaPrecio
        const actionDB = await Listas_Precios.findByIdAndDelete(id)
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const getListasPrecioByIdProduct = async (req = request, res = response) => {
    try {
        const id = req.params.idProducto
        const listaPrecio = await Listas_Precios.find({ ID_PRODUCTO: id })
        if (listaPrecio) {
            return serverOkMessage(res, listaPrecio)
        } else {
            return serverOkMessage(res, 'No se encontró listas de precios de este articulo')
        }
    } catch (error) {
        return serverErrorMessage(res)
    }
}

export { createListaPrecio, findListasPrecio, deleteListaPrecio, updateListaPrecio, getListasPrecioByIdProduct }
