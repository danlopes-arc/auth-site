import express from 'express'
import bcrypt from 'bcrypt'
import passport from 'passport'
import { validate } from 'validate.js'

import { UserModel } from '../../models/User'
import {
  IFieldErrors as IFieldErrorSet,
  IFormError,
  IUserDocument,
  IUserRegisterData,
} from '../../types'
import {
  normalize,
  trimIfOnlySpacesNormalize,
  trimNormalize,
} from '../../utils/validatejs'
import { signAsync } from '../../utils/jwt'
import { loginConstraints, registerConstraints } from '../../utils/constraints'

const router = express()

router.post('/register', async (req, res) => {
  const name = trimNormalize(req.body.name)
  const email = trimNormalize(req.body.email)?.toLowerCase() ?? null
  const password = normalize(req.body.password)

  const formErrror: IFormError = {
    message: 'there are errors',
    fields: validate(
      {
        name,
        email,
        password,
      },
      registerConstraints
    ),
  }

  if (formErrror.fields) {
    return res.status(400).json(formErrror)
  }

  try {
    const user = await UserModel.findOne({ email: email! })

    if (user) {
      formErrror.fields = { email: ['Email already in use'] }
      return res.status(400).json(formErrror)
    }

    const hash = await bcrypt.hash(password, 12)

    await new UserModel({
      name: name!,
      email: email!,
      hash,
    }).save()

    return res.sendStatus(201)
  } catch (err) {
    console.log('[server][error] user register\n', err)
    return res.sendStatus(500)
  }
})

router.post('/login', async (req, res) => {
  const email = trimNormalize(req.body.email)?.toLowerCase() ?? null
  const password = trimIfOnlySpacesNormalize(req.body.password)

  const formErrror: IFormError = {
    message: 'there are errors',
    fields: validate(
      {
        email,
        password,
      },
      loginConstraints
    ),
  }

  if (formErrror.fields) {
    return res.status(400).json(formErrror)
  }

  try {
    const user = await UserModel.findOne({ email: email! })

    if (!user) {
      formErrror.fields = { email: ['Email does not exist'] }
      return res.status(404).json(formErrror)
    }

    const match = await bcrypt.compare(password, user.hash)

    if (!match) {
      formErrror.fields = { password: ['Password is incorrect'] }
      return res.status(400).json(formErrror)
    }

    const token = await signAsync({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    })

    return res.json({ token })
  } catch (err) {
    console.log('[server][error] user register\n', err)
    return res.sendStatus(500)
  }
})

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.user! as IUserDocument
    return res.json({ user: user.getInfo() })
  }
)

export default router
