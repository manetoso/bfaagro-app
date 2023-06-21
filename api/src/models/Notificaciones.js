import { Schema, model } from 'mongoose'

const NOTIFICACIONES = new Schema({
  ID_NOTIFICACION: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  NOTIFICAION: {
    ID_TIPO_NOTIFICACION: {
      type: String,
      required: true
    },
    TIPO_NOTIFICACION: {
      type: String,
      required: true
    }
  },
  CATALOGO: {
    ID_CATALOGO: {
      type: String,
      required: true
    },
    NOMBRE_CATALAGO: {
      type: String,
      required: true
    }
  },
  NOTIFICAR_RESTEN: {
    type: Number,
    required: true
  }
},{ timestamps: true })

NOTIFICACIONES.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...notificaciones } = this.toObject()
  return notificaciones
}
export default model('NOTIFICACIONES', NOTIFICACIONES)
