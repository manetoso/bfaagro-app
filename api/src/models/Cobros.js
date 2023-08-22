import { Schema, model } from 'mongoose'

const COBROS = new Schema({
  ID_CUENTAxCOBRAR: {
    type: Schema.Types.ObjectId,
    ref: 'CUENTASxCOBRAR'
  },
  FOLIO_CXC: {
    type: String,
    required: true
  },
  FOLIO_COBRO: {
    type: String,
    required: true
  },
  ID_VENTA: {
    type: Schema.Types.ObjectId,
    ref: 'VENTAS'
  },
  FECHA_COBRO: {
    type: Date,
    default: Date.now(),
  },
  CANTIDAD_COBRADA: {
    type: Number,
    required: true
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
  }
}, { timestamps: true })

COBROS.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...cobro } = this.toObject()
  return cobro
}

export default model('COBROS', COBROS)
