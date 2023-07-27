import { Schema, model } from 'mongoose'

const VENTAS = new Schema({
  FOLIO: {
    type: String,
    required: true,
  },
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
      },
      NOMBRE_CLIENTE: {
        type: String,
        required: true
      }
    }
  },

}, { timestamps: true })

VENTAS.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...ventas } = this.toObject()
  return ventas
}

export default model('VENTAS', VENTAS)
