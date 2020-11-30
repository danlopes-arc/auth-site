import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import passport from 'passport'

import apiRoute from './routes/api'
import passportConfig from './config/passport'
import { signAsync } from './utils/jwt'

const main = async () => {
  dotenv.config()
  passportConfig()

  try {
    mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('[mongo] connected')
  } catch (err) {
    console.error(err)
    return
  }

  const app = express()

  app.use(express.json())
  app.use(passport.initialize())

  app.use('/api', apiRoute)

  const port = process.env.PORT

  app.listen(port, () => {
    console.log(`[server] listening to http://localhost:${port}`)
  })
}

main()
