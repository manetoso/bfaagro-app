import { Schema, model } from 'mongoose'

const ALMACENES = new Schema({
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
export default model('ALMACENES', ALMACENES)
