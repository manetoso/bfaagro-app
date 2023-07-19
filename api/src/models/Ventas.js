import { Schema, model } from 'mongoose'

const VENTAS = new Schema({
  CLIENTES: {
    CLIENTE_ORIGEN: {
      ID_CLIENTE: {
        type: Schema.Types.ObjectId,
        ref: 'CLIENTES',
      },
      NOMBRE_CLIENTE: {
        type: String,
        default: "BFA AGRO S.A de C.V"
      }
    },
    CLIENTE_DESTINO: {
      ID_CLIENTE: {
        type: String,
        ref: 'CLIENTES',
        required: true
      },
      NOMBRE_CLIENTE: {
        type: String,
        required: true
      }
    }
  },
  FECHA_VENCIMIENTO: {
    type: Date,
    default: Date.now(),
    required: true
  },
  STATUS: {
    ID_TIPO_STATUS: {
      type: Schema.Types.ObjectId,
      ref: 'TIPOS_DOCUMENTOS',
    },
    STATUS: {
      type: String,
      required: true
    }
  },
  TOTAL_VENTA: {
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
    required: true
  }
}, { timestamps: true })

VENTAS.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...ventas } = this.toObject()
  return ventas
}

export default model('VENTAS', VENTAS)
