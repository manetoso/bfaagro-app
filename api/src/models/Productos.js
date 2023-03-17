import { Schema, model } from 'mongoose'

const PRODUCTOS = new Schema({
  _id: false,
  ID_PRODUCTO: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
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
  TIPO_PRODUCTO: {
    ID_TIPO_PRODUCTO: {
      type: String,
      required: true
    },
    TIPO_PRODUCTO: {
      type: String,
      required: true
    }
  },
  ALMACEN: {
    ID_ALMACEN: {
      type: String,
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

module.exports = model(PRODUCTOS, 'PRODUCTOS')
