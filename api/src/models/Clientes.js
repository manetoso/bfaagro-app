import { Schema, model } from 'mongoose'

const CLIENTES = new Schema({
  TIPO_CLIENTE: {
    ID_TIPO_CLIENTE: {
      type: Schema.Types.ObjectId,
      ref: 'TIPOS_DOCUMENTOS',
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
    unique: true
  },
  DOMICILIO: {
    type: String,
  },
  EMPRESA: {
    type: String,
  }
}, { timestamps: true })

CLIENTES.methods.toJSON = function () {
  const { __v, ...clientes } = this.toObject()
  return clientes
}

export default model('CLIENTES', CLIENTES)
