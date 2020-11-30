import passport from 'passport'
import jwt, { ExtractJwt } from 'passport-jwt'

import { UserModel } from '../models/User'

export default () => {
  const options: jwt.StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }

  passport.use(
    new jwt.Strategy(options, async (decodedToken, done) => {
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
}
