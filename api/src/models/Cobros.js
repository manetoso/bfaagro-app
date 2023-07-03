import { Schema, model } from 'mongoose'

const COBROS = new Schema({
  ID_COBRO: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  ID_VENTA: {
    type: Schema.Types.ObjectId,
    ref: 'VENTAS'
  },
  COBRO: {
    FORMA_COBRO: {
      ID_FORMA_COBRO: {
        type: String,
        required: true
      },
      FORMA_COBRO: {
        type: String,
        required: true
      }
    },
    MONTO_COBRO: {
      type: Number,
      required: true
    }
  }
}, { timestamps: true })

COBROS.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...cobro } = this.toObject()
  return cobro
}

export default model(COBROS, 'COBROS')
