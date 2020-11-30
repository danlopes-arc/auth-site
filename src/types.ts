import { Document } from 'mongoose'

export interface IUserInfo {
  id: any
  name: string
  email: string
}

export interface IUserDocument extends Document {
  name: string
  email: string
  hash: string
  getInfo: () => IUserInfo
}

export interface IUserRegisterData {
  name?: string
  email?: string
  password?: string
}

export interface IFormError {
  message: string
  fields: IFieldErrors
}

export interface IFieldErrors {
  [key: string]: string[]
}
