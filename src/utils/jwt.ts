import jwt from 'jsonwebtoken'

export const signAsync = (payload: object, secret: string) =>
  new Promise<string>((resolve, reject) =>
    jwt.sign(payload, secret, (err, encoded) => {
      if (err) return reject(err)
      return resolve(encoded!)
    })
  )