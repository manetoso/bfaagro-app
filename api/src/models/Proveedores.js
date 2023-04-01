import { Schema, model } from 'mongoose'

const PROVEEDORES = new Schema({
  
  ID_PROVEEDOR: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  TIPO_PROVEEDR: {
    ID_TIPO_PROVEEDOR: {
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

PROVEEDORES.methods.toJSON = function () {
  const { __v, ...proveedores } = this.toObject()
  return proveedores
}

export default model(PROVEEDORES, 'PROVEEDORES')
