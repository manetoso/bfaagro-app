import { Schema, model } from 'mongoose'

const BITACORA_PRODUCTOS = new Schema({
  _id: false,
  ID_BITACORA_PRODUCTO: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  PRODUCTO: {
    ID_PRODUCTO: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'PRODUCTOS'
    },
    PRODUCTO: {
      type: String,
      required: true
    }
  },
  MOVIMIENTO: {
    type: String,
    required: true
  },
  CANTIDAD: {
    type: Number,
    required: true
  },
  CLIENTES: {
    CLIENTE_ORIGEN: {
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
    CLIENTE_DESTINO: {
      ID_CLIENTE: {
        type: Schema.Types.ObjectId,
        ref: 'CLIENTES',
        required: true
      },
      NOMBRE_CLIENTE: {
        type: String,
        required: true
      }
    }
  }
})

BITACORA_PRODUCTOS.methods.toJSON = function () {
  const { __v, ...bitacoraProductos } = this.toObject()
  return bitacoraProductos
}

module.exports = model(BITACORA_PRODUCTOS, 'BITACORA_PRODUCTOS')
