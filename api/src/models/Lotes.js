import { Schema, model } from 'mongoose'

const LOTES = new Schema(
  {
    SERIE: {
      type: String,
      required: true,
    },
    CONSECUTIVO:{
        type: Number,
        required: true,
    },
    ID_PRODUCTO:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'PRODUCTOS'
    },
    ULTIMO_REALIZADO:{
        type: String,
        default: ""
    }
  },
  { timestamps: true }
)

LOTES.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...lotes } = this.toObject()
  return lotes
}

export default model('LOTES', LOTES)
