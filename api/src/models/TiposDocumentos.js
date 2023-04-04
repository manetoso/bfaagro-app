import { Schema, model } from 'mongoose'

const TIPOS_DOCUMENTOS = new Schema({
  TIPO_DOCUMENTO: {
    type: String,
    required: true
  },
  VALOR: {
    type: Object,
    required: true
  }
})

TIPOS_DOCUMENTOS.methods.toJSON = function () {
  const { __v, ...tiposDocumentos } = this.toObject()
  return tiposDocumentos
}

export default model('TIPOS_DOCUMENTOS', TIPOS_DOCUMENTOS)
