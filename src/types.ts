import { Document } from 'mongoose'

export interface IUser extends Document {
  name: string,
  email: string,
  hash: string
}

export interface IUserRegisterData {
  name?: string,
  email?: string
  password?: string
}

export interface IFormError {
  message: string,
  fields: IFieldErrors
}

export interface IFieldErrors {
  [key: string]: string,
}