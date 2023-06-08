import { Schema, model } from 'mongoose'

const ROLES = new Schema(
  {
    ROL: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
)

ROLES.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...roles } = this.toObject()
  return roles
}

export default model('ROLES', ROLES)
