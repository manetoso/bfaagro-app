import { Schema, model } from 'mongoose'

const FORMULAS = new Schema({
  _id: false,
  ID_FORMULA: {
    type: String,
    unique: true,
    index: true,
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
  CANTIDAD: {
    type: Number,
    required: true
  },
  FORMULACION_DETALLE: [
    {
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
})

FORMULAS.methods.toJSON = function () {
  const { __v, ...formulas } = this.toObject()
  return formulas
}

module.exports = model(FORMULAS, 'FORMULAS')
