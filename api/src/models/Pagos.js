import { Schema, model } from 'mongoose'

const PAGOS = new Schema({
  ID_CUENTAxPAGAR: {
    type: Schema.Types.ObjectId,
    ref: 'CUENTASxPAGAR'
  },
  FOLIO: {
    type: String,
    required: true
  },
  FECHA_PAGO: {
    type: Date,
    default: Date.now(),
    required: true
  },
  CANTIDAD_PAGADA: {
    type: Number,
    required: true
  },
  PROVEEDOR: {
    ID_PROVEEDOR: {
      type: Schema.Types.ObjectId,
      ref: 'PROVEEDORES',
      required: true
    },
    NOMBRE_EMPRESA: {
      type: String,
      required: true
    },
    AGENTE: {
      type: String,
      required: true
    }
  },
  OBSERVACIONES: {
    type: String,
    required: true
  }

}, { timestamps: true })

PAGOS.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...pago } = this.toObject()
  return pago
}

export default model('PAGOS', PAGOS)
