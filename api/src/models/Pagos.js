import { Schema, model } from 'mongoose'

const PAGOS = new Schema({
  
  ID_PAGO: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  ID_COMPRA: {
    type: Schema.Types.ObjectId,
    ref: 'COMPRAS'
  },
  PAGO: {
    FORMA_PAGO: {
      ID_FORMA_COBRO: {
        type: String,
        required: true
      },
      FORMA_PAGO: {
        type: String,
        required: true
      }
    },
    MONTO_PAGO: {
      type: Number,
      required: true
    }
  }
})

PAGOS.methods.toJSON = function () {
  const { __v, ...pago } = this.toObject()
  return pago
}

export default model(PAGOS, 'PAGOS')
