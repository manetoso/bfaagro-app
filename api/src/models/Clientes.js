import { Schema, model } from 'mongoose'

const CLIENTES = new Schema({
  
  ID_CLIENTE: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  TIPO_CLIENTE: {
    ID_TIPO_CLIENTE: {
      type: String,
      required: true
    },
    TIPO_CLIENTE: {
      type: String,
      required: true
    }
  },
  NOMBRE_CLIENTE: {
    type: String,
    required: true
  },
  APELLIDOS: {
    type: String,
    required: true
  },
  NUMERO_TELEFONO: {
    type: String,
    required: true,
    unique: true
  },
  CORREO: {
    type: String,
    required: true,
    unique: true
  },
  EMPRESA: {
    type: String,
    required: true
  }
})

CLIENTES.methods.toJSON = function () {
  const { __v, ...clientes } = this.toObject()
  return clientes
}

export default model(CLIENTES, 'CLIENTES')
