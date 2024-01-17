import { Schema, model } from 'mongoose'

const VENTAS_DETALLE = new Schema({
  ID_VENTA: {
    type: Schema.Types.ObjectId,
    ref: 'VENTAS'
  },
  PRODUCTOS: [
    {
      _id: false,
      ID_PRODUCTO: {
        type: Schema.Types.ObjectId,
        ref: 'PRODUCTOS_EMBALAJADOS',
        required: true
      },
      LOTES: [{
        _id: false,
        LOTE:{
          type: String,
          default:''
        },
        CANTIDAD:{
          type: Number,
          default: null
        }
      }],
      INCREMENTO: {
        type: Number,
        required: true
      },
      NOMBRE_PRODUCTO: {
        type: String,
        required: true
      },
      CANTIDAD: {
        type: Number,
        required: true
      },
      UNIDAD_MEDIDA: {
        type: String,
        required: true
      },
      PRECIO_UNITARIO: {
        type: Number,
        required: true
      }
    }
  ],
  PRECIO_TOTAL: {
    type: Number,
    required: true
  }
},{ timestamps: true })

VENTAS_DETALLE.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...ventaDetalle } = this.toObject()
  return ventaDetalle
}

export default model('VENTAS_DETALLE', VENTAS_DETALLE)
