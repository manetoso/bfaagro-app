import { Schema, model } from 'mongoose'

const TIPOS_DOCUMENTOS = new Schema(
  {
    TIPO_DOCUMENTO: {
      type: String,
      required: true
    },
    VALOR: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

TIPOS_DOCUMENTOS.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...tiposDocumentos } = this.toObject()
  return tiposDocumentos
}

export default model('TIPOS_DOCUMENTOS', TIPOS_DOCUMENTOS)
