import { Schema, model } from 'mongoose'

const USUARIOS = new Schema({
  USUARIO: {
    type: String,
    unique: true,
    required: true
  },
  CONTRASENA: {
    type: String,
    required: true
  },
  ROLES: [
    {
      _id: false,
      ID_ROL: {
        type: Schema.Types.ObjectId,
        ref: 'TIPOS_DOCUMENTOS',
        required: true
      },
      ROL: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true })

USUARIOS.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, CONTRASENA, ...usuarios } = this.toObject()
  return usuarios
}

export default model('USUARIOS', USUARIOS)
