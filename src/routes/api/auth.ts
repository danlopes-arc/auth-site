import express, { RequestHandler } from 'express'
import passport from 'passport'
import keys from '../../config/keys'
import { IUserDocument } from '../../types'
import { signAsync } from '../../utils/jwt'

const router = express.Router()

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

router.get(
  '/github/login',
  passport.authenticate('github', {
    failureRedirect: '/login',
    session: false,
  }),
  async (req, res) => {
    // Successful authentication, redirect home.
    const user = req.user as IUserDocument

    try {
      const token = await signAsync({ id: user._id }, keys.jwtSecret, {
        expiresIn: '1h',
      })

      return res.json({ token })
    } catch (err) {
      console.log('[server][error] user github jwt sign\n', err)
      return res.sendStatus(500)
    }
  }
)

export default router
