import mongoose, { Document } from 'mongoose'

export interface IUser extends Document {
  name: string,
  email: string,
  hash: string
}

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  },
})

UserSchema.virtual('info')
  .get(function (this: any) {
    return (({ name, email, _id }: any) => ({ name, email, id: _id }))(this)
  })

export const User = mongoose.model<IUser>('User', UserSchema)