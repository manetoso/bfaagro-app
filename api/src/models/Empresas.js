import { Schema, model } from 'mongoose'

const EMPRESAS = new Schema({
  EMPRESA: {
    type: String,
    required: true
  },
  DIRECCION: {
    type: String,
    required: true
  },
})

EMPRESAS.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...empresa } = this.toObject()
  return empresa
}

export default model('EMPRESAS', EMPRESAS)
