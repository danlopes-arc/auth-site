import passport from 'passport'
import jwt, { ExtractJwt } from 'passport-jwt'
import github from 'passport-github'

import { UserModel } from '../models/User'
import keys from './keys'
import axios, { AxiosRequestConfig } from 'axios'

export default () => {
  const jwtOptions: jwt.StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwtSecret,
  }

  passport.use(
    new jwt.Strategy(jwtOptions, async (decodedToken, done) => {
      try {
        const user = await UserModel.findById(decodedToken.id)

        if (!user) {
          return done(null, false)
        }
        return done(null, user)
      } catch (err) {
        console.error('[server][error] passport jwt auth error\n', err)
        return done(err)
      }
    })
  )

  const githubOptions: github.StrategyOptions = {
    clientID: keys.githubClientId,
    clientSecret: keys.githubClientSecret,
    scope: ['user:email'],
  }

  passport.use(
    new github.Strategy(
      githubOptions,
      async (accessToken, refreshToken, { _json }: any, done) => {
        let email = _json.email

        try {
          if (!email) {
            const config: AxiosRequestConfig = {
              headers: {
                Authorization: `token ${accessToken}`,
              },
            }
            const res = await axios.get(
              'https://api.github.com/user/emails?per_page=100',
              config
            )

            const emails = res.data as any[]
            email =
              emails.find((email) => email.primary).email || emails[0].email
          }

          let user = await UserModel.findOne({ githubId: _json.id })
          if (!user) {

            user = await UserModel.findOne({ email: email })
            if (user) {
              user.githubId = _json.id
              user = await user.save()
            } else {
              user = await new UserModel({
                name: _json.name || _json.login,
                email: email,
                hash: 'default',
                githubId: _json.id,
              }).save()
            }
          }
          
          done(undefined, user)
        } catch (err) {
          return done(err)
        }
      }
    )
  )
}
