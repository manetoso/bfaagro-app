import { Schema, model } from 'mongoose'

const COMPRAS_DETALLE = new Schema({
  ID_COMPRA_DETALLE: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  ID_COMPRA: {
    type: Schema.Types.ObjectId,
    ref: 'VENTAS'
  },
  PRODUCTO: {
    ID_PRODUCTO: {
      type: Schema.Types.ObjectId,
      ref: 'PRODUCTOS',
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

COMPRAS_DETALLE.methods.toJSON = function () {
  const { __v, ...comprasDetalle } = this.toObject()
  return comprasDetalle
}

export default model(COMPRAS_DETALLE, 'COMPRAS_DETALLE')
