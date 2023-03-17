import { Schema, model } from 'mongoose'

const EMBALAJES_PRODUCTO = new Schema({
  _id: false,
  ID_EMBALAJE_PRODUCTO: {
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
    },
    CANTIDAD: {
      type: Number,
      required: true
    }
  }
})

EMBALAJES_PRODUCTO.methods.toJSON = function () {
  const { __v, ...embalajesProducto } = this.toObject()
  return embalajesProducto
}

module.exports = model(EMBALAJES_PRODUCTO, 'EMBALAJES_PRODUCTO')
