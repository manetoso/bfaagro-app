import { Schema, model } from 'mongoose'

const ALMACENES = new Schema({
  _id: false,
  ID_ALMACEN: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  NOMBRE_ALMACEN: {
    type: String,
    required: true
  },
  TIPO_ALMACEN: {
    ID_TIPO_ALMACEN: {
      type: String,
      required: true
    },
    TIPO_ALMACEN: {
      type: String,
      required: true
    }
  }
})
ALMACENES.methods.toJSON = function () {
  const { __v, ...almacenes } = this.toObject()
  return almacenes
}
module.exports = model('ALMACENES', ALMACENES)
