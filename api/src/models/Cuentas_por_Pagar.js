import { Schema, model } from 'mongoose'

const CUENTASxPAGAR = new Schema(
  {
    ID_ORDEN_COMPRA: {
      type: Schema.Types.ObjectId,
      ref: 'ORDENES_COMPRAS',
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
    FECHA_EMISION: {
      type: Date,
      default: Date.now(),
      required: true
    },
    FOLIO_ORDEN: {
      type: String,
      required: true,
      unique: true
    },
    FOLIO_CXP: {
      type: String,
      required: true,
      unique: true
    },
    CANTIDAD: {
      type: Number,
      required: true
    },
    FECHA_PAGO: {
      type: Date,
      default: Date.now(),
      required: true
    },
    CANTIDAD_PAGADA: {
      type: Number,
      default: 0,
      required: true
    },
    SALDO: {
      type: Number,
      required: true,
    },
    OBSERVACIONES: {
      type: String,
      default: ''
    },
    ESTADO: {
      type: String,
      default: 'Pendiente'
    },
  },
  { timestamps: true }
)
CUENTASxPAGAR.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...cuentasxPagar } = this.toObject()
  return cuentasxPagar
}
export default model('CUENTASxPAGAR', CUENTASxPAGAR)
