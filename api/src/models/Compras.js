import { Schema, model } from 'mongoose'

const COMPRAS = new Schema({
  
  ID_COMPRA: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  PROVEEDOR: {
    ID_PROVEEDOR: {
      type: String,
      ref: 'PROVEEDORES'
    },
    NOMBRE_PROVEEDOR: {
      type: String,
      required: true
    }
  },
  FECHA_VENCIMIENTO: {
    type: Date,
    default: Date.now().toString,
    required: true
  },
  STATUS: {
    ID_TIPO_STATUS: {
      type: String,
      required: true
    },
    STATUS: {
      type: String,
      required: true
    }
  },
  TOTAL_COMPRA: {
    type: Number,
    required: true
  },
  TOTAL_PAGADO: {
    type: Number,
    default: 0,
    required: true
  },
  SALDO: {
    type: Number,
    default: this.TOTAL_COMPRA,
    required: true
  }
})

COMPRAS.methods.toJSON = function () {
  const { __v, ...compras } = this.toObject()
  return compras
}

export default model(COMPRAS, 'COMPRAS')
