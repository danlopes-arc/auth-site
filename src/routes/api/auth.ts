import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/me')
  }
)

export default router