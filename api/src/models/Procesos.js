import { Schema, model } from 'mongoose'

const PROCESOS = new Schema({
  
  ID_PROCESO: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  FORMULA: {
    type: Schema.Types.Subdocument,
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
})

PROCESOS.methods.toJSON = function () {
  const { __v, ...procesos } = this.toObject()
  return procesos
}

export default model(PROCESOS, 'PROCESOS')
