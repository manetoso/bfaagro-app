import { Schema, model } from 'mongoose'

const FACTURAS = new Schema({
  _id: false,
  ID_FACTURAS: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  COBRO: {
    ID_COBRO: {
      type: String,
      required: true,
      ref: 'COBROS'
    },
    MONTO_COBRO: {
      type: Number,
      required: true
    }
  },
  PAGO: {
    ID_PAGO: {
      type: String,
      required: true,
      ref: 'PAGOS'
    },
    MONTO_PAGO: {
      type: Number,
      required: true
    }
  }
})
FACTURAS.methods.toJSON = function () {
  const { __v, ...facturas } = this.toObject()
  return facturas
}
module.exports = model('FACTURAS', FACTURAS)
