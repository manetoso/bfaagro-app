import { Schema, model } from 'mongoose'

const PRODUCTOS = new Schema(
  {
    LOTES: [{
      LOTE:{
        type: String,
        default:''
      },
      CANTIDAD:{
        type: Number,
        default: null
      }
    }],
    NOMBRE_PRODUCTO: {
      type: String,
      required: true,
    },
    CANTIDAD: {
      type: Number,
      required: true
    },
    UNIDAD_MEDIDA: {
      type: String,
      required: true
    },
    CANTIDAD_MINIMA:{
      type: Number,
      required: true
    },
    TIPO_PRODUCTO: [
      {
        _id: false,
        ID_TIPO_PRODUCTO: {
          type: Schema.Types.ObjectId,
          ref: 'TIPOS_DOCUMENTOS',
          required: true
        },
        TIPO_PRODUCTO: {
          type: String,
          required: true
        }
      }
    ],
    ALMACEN: {
      ID_ALMACEN: {
        type: Schema.Types.ObjectId,
        ref: 'ALMACENES',
        required: true
      },
      NOMBRE_ALMACEN: {
        type: String,
        required: true
      }
    }
  },
  { timestamps: true }
)

PRODUCTOS.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...productos } = this.toObject()
  return productos
}

export default model('PRODUCTOS', PRODUCTOS)
