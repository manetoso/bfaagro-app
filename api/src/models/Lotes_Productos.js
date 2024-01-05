import { Schema, model } from 'mongoose'

const LOTES_PRODUCTOS = new Schema(
  {
    LOTE: {
      type: String,
      required: true,
    },
    PRODUCTO: {
        ID_PRODUCTO: {
            type: String,
            required: true
        },
        NOMBRE_PRODUCTO: {
            type: String,
            required: true
        },
        UNIDAD_MEDIDA: {
            type: String,
            required: true
          },
        CANTIDAD:{
            type: Number,
            required: true
        },
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
    }
  },
  { timestamps: true }
)

LOTES_PRODUCTOS.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...lotes_productos } = this.toObject()
  return lotes_productos
}

export default model('LOTES_PRODUCTOS', LOTES_PRODUCTOS)
