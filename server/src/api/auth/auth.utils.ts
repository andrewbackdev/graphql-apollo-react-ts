import { JwtSecret } from './auth.config.js'
import jwt from 'jsonwebtoken'

interface SignJwtPayload {
  id: string
}

export const signJwt = (payload: SignJwtPayload) => {
  return jwt.sign(payload, JwtSecret)
}
