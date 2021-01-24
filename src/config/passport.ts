import passport from 'passport'
import jwt, { ExtractJwt } from 'passport-jwt'
import github from 'passport-github'

import { UserModel } from '../models/User'
import keys from './keys'

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
  }

  passport.use(
    new github.Strategy(
      githubOptions,
      async (accessToken, refreshToken, { _json }: any, done) => {
        try {
          let user = await UserModel.findOne({ 'githubId': _json.sub })
          if (!user) {
            console.log('%%%%% user not found')
            user = await new UserModel({
              name: _json.name,
              email: _json.email,
              hash: 'default',
              auths: {
                githubId: _json.sub,
              },
            }).save()
          }
          console.log('%%%%% user found')
          done(undefined, user)
        } catch (err) {
          return done(err)
        }
      }
    )
  )
}
