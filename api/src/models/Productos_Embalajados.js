import { Schema, model } from 'mongoose'

const PRODUCTOS_EMBALAJADOS = new Schema({
  _id: false,
  ID_PRODUCTO_EMBALAJADO: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  PRODUCTO: {
    ID_PRODUCTO: {
      type: Schema.Types.ObjectId,
      ref: 'PRODUCTOS',
      default: null
    },
    NOMBRE_PRODUCTO: {
      type: String,
      default: null
    },
    CANTIDAD: {
      type: Number,
      default: null
    }
  },
  PRODUCTO_EMBALAJADO: {
    ID_PRODUCTO_EMBALAJADO: {
      type: Schema.Types.ObjectId,
      ref: 'PRODUCTOS_EMBALAJADOS',
      default: null
    },
    NOMBRE_PRODUCTO_EMBALAJADO: {
      type: String,
      default: null
    },
    CANTIDAD: {
      type: Number,
      default: null
    }
  },
  EMBALAJE_PRODUCTO: {
    ID_PRODUCTO: {
      type: Schema.Types.ObjectId,
      ref: 'PRODUCTOS'
    },
    NOMBRE_PRODUCTO: {
      type: String,
      required: true
    }
  },
  EXISTENCIA: {
    type: Number,
    required: true
  }
})

PRODUCTOS_EMBALAJADOS.methods.toJSON = function () {
  const { __v, ...productosEmbalajados } = this.toObject()
  return productosEmbalajados
}

module.exports = model(PRODUCTOS_EMBALAJADOS, 'PRODUCTOS_EMBALAJADOS')
