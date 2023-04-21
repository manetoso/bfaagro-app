import { Schema, model } from 'mongoose'

const FORMULAS = new Schema(
  {
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
    UNIDAD_MEDIDA: {
      type: String,
      required: true
    },
    CANTIDAD: {
      type: Number,
      required: true
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
        }
      }
    ]
  },
  { timestamps: true }
)

FORMULAS.methods.toJSON = function () {
  const { __v, ...formulas } = this.toObject()
  return formulas
}

export default model('FORMULAS', FORMULAS)
