import { Schema, model } from 'mongoose'
import MovimientosAlmacen from './MovimientosAlmacen'

const MOVIMIENTOS_ALMACEN_CLIENTE = new Schema({
  MOVIMIENTO: {
    ID_MOVIMIENTO: {
        type: Schema.Types.ObjectId,
        ref: 'TIPOS_DOCUMENTOS'
    },
    MOVIMIENTO: {
        type: String,
        required: true
    }
},
  CLIENTE: {
    ID_CLIENTE: {
        type: Schema.Types.ObjectId,
        ref: 'CLIENTES',
        required: true
    },
    NOMBRE_CLIENTE:{
        type: String,
        required: true     
    }
  },
  PRODUCTO: {
    type: String,
    required: true
  },
  UNIDAD_MEDIDA: {
    type: String,
    required: true
  },
  PRECIO_PUBLICO: {
    type: String,
    required: true
  },
  FECHA: {
    type: Date,
    required: true,
    unique: true
  }
}, { timestamps: true })

MOVIMIENTOS_ALMACEN_CLIENTE.methods.toJSON = function () {
  const { __v, ...movimientosAlmacenCliente } = this.toObject()
  return movimientosAlmacenCliente
}

export default model('MOVIMIENTOS_ALMACEN_CLIENTE', MOVIMIENTOS_ALMACEN_CLIENTE)
