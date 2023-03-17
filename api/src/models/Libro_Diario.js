import { Schema, model } from 'mongoose'

const LIBRO_DIARIO = new Schema({
  _id: false,
  ID_DIARIO: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  REGISTRO: {
    ID_TIPO_REGISTO: {
      type: String,
      required: true
    },
    TIPO_REGISTRO: {
      type: String,
      required: true
    },
    DOCUMENTO: {
      type: Schema.Types.Subdocument,
      required: true
    }
  },
  MONTO: {
    type: Number,
    required: true
  },
  FORMA_PAGO: {
    ID_FORMA_PAGO: {
      type: String,
      required: true
    },
    FORMA_PAGO: {
      type: String,
      required: true
    }
  }
})

LIBRO_DIARIO.methods.toJSON = function () {
  const { __v, ...libroDiario } = this.toObject()
  return libroDiario
}

module.exports = model(LIBRO_DIARIO, 'LIBRO_DIARIO')
