import { Schema, model } from 'mongoose'

const PROVEEDORES = new Schema({
  NOMBRE_EMPRESA: {
    type: String,
    required: true
  },
  AGENTE: {
    type: String,
    required: true
  },
  NUMERO_TELEFONO: {
    type: String
  },
  TIPO_PROVEEDOR: {
    ID_TIPO_PROVEEDOR: {
      type: Schema.Types.ObjectId,
      ref: 'TIPOS_DOCUMENTOS',
      required: true
    },
    TIPO_PROVEEDOR: {
      type: String,
      required: true
    }
  }
})

PROVEEDORES.methods.toJSON = function () {
  const { __v, ...proveedores } = this.toObject()
  return proveedores
}

export default model('PROVEEDORES',PROVEEDORES)
