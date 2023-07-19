import { CLIENTES } from '../models/Index.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'
import { createAlmacenCliente } from './AlmacenesController.js'

const createCliente = async (req = request, res = response) => {
  try {
    const { TIPO_CLIENTE, NOMBRE_CLIENTE, APELLIDOS, NUMERO_TELEFONO, CORREO, DOMICILIO, EMPRESA } = req.body
    const cliente = {
      TIPO_CLIENTE, NOMBRE_CLIENTE, APELLIDOS, NUMERO_TELEFONO, CORREO, DOMICILIO, EMPRESA
    }

    const actionDB = await CLIENTES.create(cliente)
    if(actionDB.TIPO_CLIENTE.TIPO_CLIENTE == "COMISIONISTA"){
      await createAlmacenCliente(actionDB._id)
    }
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const findClientes = async (req = request, res = response) => {
  try {
    const actionDB = await CLIENTES.find().sort({ createdAt: -1 })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const updateCliente = async (req = request, res = response) => {
  try {
    const id = req.params.idCliente
    const data = req.body
    const actionDB = await CLIENTES.findByIdAndUpdate(id, data, {
      new: true
    })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const deleteCliente = async (req = request, res = response) => {
  try {
    const id = req.params.idCliente
    const actionDB = await CLIENTES.findByIdAndDelete(id)
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const getTypeCliente = async (idCliente = '') => {
  try {
    const cliente = await CLIENTES.findById(idCliente)
    if(cliente &&  cliente.TIPO_CLIENTE.TIPO_CLIENTE){
      return cliente.TIPO_CLIENTE.TIPO_CLIENTE
    }else{
      return new Error
    }
  } catch (error) {
    console.log(error);
  }
}

export { createCliente, findClientes, deleteCliente, updateCliente, getTypeCliente }
