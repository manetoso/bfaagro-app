import { Schema, model } from 'mongoose'

const USUARIOS = new Schema({
  _id: false,
  ID_USUARIO: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  USUARIO: {
    type: String,
    unique: true,
    required: true
  },
  CONTRASENA: {
    type: String,
    required: true
  },
  CORREO: {
    type: String,
    unique: true,
    required: true
  }
})

USUARIOS.methods.toJSON = function () {
  const { __v, ...usuarios } = this.toObject()
  return usuarios
}

module.exports = model(USUARIOS, 'USUARIOS')
