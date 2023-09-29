import { Schema, model } from 'mongoose'

const BITACORA_PRODUCTOS = new Schema({
  IDENTIFICADOR: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  PRODUCTOS: [
    {
      ID_PRODUCTO: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'PRODUCTOS'
      },
      NOMBRE_PRODUCTO: {
        type: String,
        required: true
      },
      CANTIDAD: {
        type: Number,
        required: true
      },
    }
  ],
  TOTAL: {
    type: Number,
    default: 0,
    required: true
  },
  MONEDA: {
    type: String,
    required: true
  },
  MOVIMIENTO: {
    type: String,
    required: true
  },
}, { timestamps: true })

BITACORA_PRODUCTOS.methods.toJSON = function () {
  const { __v, updatedAt, ...bitacoraProductos } = this.toObject()
  return bitacoraProductos
}

export default model('BITACORA_PRODUCTOS', BITACORA_PRODUCTOS)
