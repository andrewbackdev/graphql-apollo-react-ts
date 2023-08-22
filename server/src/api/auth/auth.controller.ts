import { Request, Response } from 'express'
import { getUserByEmail } from '../../db/users.js'
import { signJwt } from './auth.utils.js'

export async function handleLogin(req: Request, res: Response) {
  const { email, password } = req.body
  const user = await getUserByEmail(email)

  if (!user || user.password !== password) {
    res.sendStatus(401)
    return
  }

  const payload = { id: user.id }
  const token = signJwt(payload)

  res.json({ token })
}
