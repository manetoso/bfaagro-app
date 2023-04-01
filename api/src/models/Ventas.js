import { Schema, model } from 'mongoose'

const VENTAS = new Schema({
  
  ID_VENTA: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  CLIENTES: {
    CLIENTE_ORIGEN: {
      ID_CLIENTE: {
        type: String,
        ref: 'CLIENTES'
      },
      NOMBRE_CLIENTE: {
        type: String
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
    default: this.TOTAL_VENTA,
    required: true
  }
})

VENTAS.methods.toJSON = function () {
  const { __v, ...libroDiario } = this.toObject()
  return libroDiario
}

export default model(VENTAS, 'VENTAS')
