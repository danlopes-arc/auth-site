import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import passport from 'passport'
import path from 'path'

import apiRoute from './routes/api'
import passportConfig from './config/passport'
import keys, { missingKeys } from './config/keys'

const main = async () => {
  if (missingKeys.length > 0) {
    return console.error(
      `[server][error] the following keys are missing: ${missingKeys.join(
        ', '
      )}`
    )
  }

  passportConfig()

  try {
    mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('[mongo] connected')
  } catch (err) {
    console.error(err)
    return
  }

  const app = express()

  const rootDir = path.join(__dirname, '..')

  app.use(express.static(path.join(rootDir, 'client', 'build')))
  app.use(express.json())
  app.use(passport.initialize())

  app.use('/api', apiRoute)

  app.get('/*', (req, res) =>
    res.sendFile(path.join(rootDir, 'client', 'build', 'index.html'))
  )
  
  const port = keys.port

  app.listen(port, () => {
    console.log(`[server] listening to http://localhost:${port}`)
  })
}

main()
