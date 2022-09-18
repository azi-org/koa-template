/**
 * token工具类
 */
import * as jwt from 'jsonwebtoken'
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError
} from 'jsonwebtoken'
import { config } from '../config'
import { constants } from './constant'
import { TokenError } from './errors'

const { jwt_config } = config

export const jwtUtil = {
  generate: (content: any = {}) => {
    return jwt.sign(content, jwt_config.secret, {
      expiresIn: jwt_config.expire
    })
  },
  verify: (token: string) => {
    return new Promise(resolve => {
      jwt.verify(token, jwt_config.secret, (err: any, decode: any) => {
        if (err) {
          if (err instanceof JsonWebTokenError) {
            throw new TokenError(
              constants.message.INVALIDTOKEN,
              constants.code.INVALIDTOKEN
            )
          } else if (err instanceof TokenExpiredError) {
            throw new TokenError(
              constants.message.TOKENEXPIRED,
              constants.message.TOKENEXPIRED
            )
          } else if (err instanceof NotBeforeError) {
            throw new TokenError(
              constants.message.TOKENNOTBEFORE,
              constants.code.TOKENNOTBEFORE
            )
          }
        } else {
          resolve(decode)
        }
      })
    })
  }
}
