import mongoose from 'mongoose'
import { IUserDocument } from '../types'

const Schema = mongoose.Schema

const UserSchema = new Schema<IUserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
})

UserSchema.methods.getInfo = function () {
  return (({ name, email, _id }) => ({ name, email, id: _id }))(this)
}

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema)
