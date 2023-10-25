import { Schema, model } from 'mongoose'

const NOTIFICACIONES = new Schema({
  NOTIFICACION: {
    TIPO_NOTIFICACION: {
      type: String,
      required: true
    },
    NOTIFICACION:{
      type: String,
      required: true
    }
  },
  VISTA: {
    type: Boolean,
    default: false
  }
},{ timestamps: true })

NOTIFICACIONES.methods.toJSON = function () {
  const { __v, ...notificaciones } = this.toObject()
  return notificaciones
}
export default model('NOTIFICACIONES', NOTIFICACIONES)
