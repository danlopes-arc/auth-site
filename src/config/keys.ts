import dotenv from 'dotenv'
dotenv.config()

const keys = {
  port: process.env.PORT || '',
  mongoURI: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  githubClientId: process.env.GITHUB_CLIENT_ID || '',
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || '',
}

const verify = (): string[] => {
  const names: string[] = []
  Object.getOwnPropertyNames(keys).forEach((name) => {
    if (keys[name as keyof typeof keys] === '') {
      names.push(name)
    }
  })
  return names
}

export default keys
export const missingKeys = verify()
