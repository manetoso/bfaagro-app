import { Schema, model } from 'mongoose'

const PROCESOS = new Schema(
  {
    PROCESO: {
      ID_ESTADO: {
        type: Schema.Types.ObjectId,
        ref: 'TIPOS_DOCUMENTOS',
        required: true
      },
      ESTADO: {
        type: String,
        required: true
      }
    },
    FORMULA: {
      ID_FORMULA: {
        type: Schema.Types.ObjectId,
        ref: 'FORMULAS',
        required: true
      },
      NOMBRE_FORMULA: {
        type: String,
        required: true
      },
      PRODUCTO: {
        ID_PRODUCTO: {
          type: Schema.Types.ObjectId,
          ref: 'PRODUCTOS',
          required: true
        },
        NOMBRE_PRODUCTO: {
          type: String,
          required: true
        }
      },
      FORMULACION_DETALLE: [
        {
          _id: false,
          ID_PRODUCTO: {
            type: Schema.Types.ObjectId,
            ref: 'PRODUCTOS',
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
        }
      ]
    },
    CANTIDAD: {
      type: Number,
      default: 1
    }
  },
  { timestamps: true }
)

PROCESOS.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...procesos } = this.toObject()
  return procesos
}

export default model('PROCESOS', PROCESOS)
