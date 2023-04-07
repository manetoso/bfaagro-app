import { Schema, model } from 'mongoose'

const PRODUCTOS = new Schema({
  NOMBRE_PRODUCTO: {
    type: String,
    required: true,
    unique: true
  },
  CANTIDAD: {
    type: Number,
    required: true
  },
  UNIDAD_MEDIDA: {
    type: String,
    required: true
  },
  TIPO_PRODUCTO: [
    {
      _id: false,
      ID_TIPO_PRODUCTO: {
        type: String,
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
})

PRODUCTOS.methods.toJSON = function () {
  const { __v, ...productos } = this.toObject()
  return productos
}

export default model('PRODUCTOS', PRODUCTOS)
