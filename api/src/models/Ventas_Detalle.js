import { Schema, model } from 'mongoose'

const VENTAS_DETALLE = new Schema({
  
  ID_VENTA_DETALLE: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  ID_VENTA: {
    type: Schema.Types.ObjectId,
    ref: 'VENTAS'
  },
  PRODUCTO_EMBALAJADO: {
    ID_PRODUCTO_EMBALAJADO: {
      type: Schema.Types.ObjectId,
      ref: 'PRODUCTOS_EMBALAJADOS',
      required: true
    },
    NOMBRE_PRODUCTO: {
      type: String,
      required: true
    },
    CANTIDAD: {
      type: Number,
      required: true
    },
    PRECIO_UNITARIO: {
      type: Number,
      required: true
    }
  },
  PRECIO_TOTAL: {
    type: Number,
    required: true
  }
})

VENTAS_DETALLE.methods.toJSON = function () {
  const { __v, ...ventaDetalle } = this.toObject()
  return ventaDetalle
}

export default model(VENTAS_DETALLE, 'VENTAS_DETALLE')
