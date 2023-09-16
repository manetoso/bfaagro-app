import { Schema, model } from 'mongoose'

const LISTAS_PRECIOS = new Schema({
  ID_PRODUCTO: {
    type: Schema.Types.ObjectId,
    ref: 'PRODUCTOS',
    required: true
  },
  PRECIO_UNITARIO: {
    type: Number,
    required: true
  },
  AUMENTO: {
    PORCENTAJE: {
      type: Number,
      default: 0
    },
    CANTIDAD: {
      type: Number,
      default: 0
    }
  },
  PRECIO_FINAL: {
    type: Number,
    required: true
  },
  TIPO_LISTA: {
    ID_TIPO: {
      type: Schema.Types.ObjectId,
      ref: 'TIPOS_DOCUMENTOS',
      required: true
    },
    TIPO_LISTA: {
      type: String,
      required: true
    }
  }
}, { timestamps: true })

LISTAS_PRECIOS.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...listasPrecios } = this.toObject()
  return listasPrecios
}

export default model('LISTAS_PRECIOS', LISTAS_PRECIOS)
