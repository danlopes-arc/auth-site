import jwt, { SignOptions } from 'jsonwebtoken'

export const signAsync = (
  payload: object,
  secret: string,
  options: SignOptions = {}
) =>
  new Promise<string>((resolve, reject) =>
    jwt.sign(payload, secret, options, (err, encoded) => {
      if (err) return reject(err)
      return resolve(encoded!)
    })
  )
