import { Schema, model } from 'mongoose'

const LISTAS_PRECIOS = new Schema({
  _id: false,
  ID_LISTA_PRECIO: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  PRODUCTO: {
    ID_PRODCUTO: {
      type: Schema.Types.ObjectId,
      ref: 'PRODUCTOS',
      required: true
    },
    NOMBRE_PRODUCTO: {
      type: String,
      required: true
    }
  },
  CLIENTE: {
    ID_CLIENTE: {
      type: Schema.Types.ObjectId,
      ref: 'CLIENTES',
      required: true
    },
    NOMBRE_CLIENTE: {
      type: String,
      required: true
    }
  },
  PRECIO_UNITARIO: {
    type: Number,
    required: true
  },
  UNIDAD_MEDIDA: {
    type: String,
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
  }
})

LISTAS_PRECIOS.methods.toJSON = function () {
  const { __v, ...listasPrecios } = this.toObject()
  return listasPrecios
}

module.exports = model(LISTAS_PRECIOS, 'LISTAS_PRECIOS')
