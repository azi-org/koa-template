/**
 * token处理中间件
 */

import * as Koa from 'koa'
import { constants } from '../utils/constant'
import { TokenError } from '../utils/errors'
import { jwtUtil } from '../utils/jwt'

export const jwtHandler = async (ctx: Koa.Context, next: Koa.Next) => {
  if (ctx.request.headers.authorization) {
    const token = ctx.request.headers.authorization.slice(7)
    const res = await jwtUtil.verify(token)
    console.log(res)
    const { id, exp } = res as any
    if (exp < +new Date() / 1000) {
      throw new TokenError(
        constants.message.TOKENEXPIRED,
        constants.code.TOKENEXPIRED
      )
    } else {
      ctx.userid = id
      await next()
    }
  } else {
    throw new TokenError(
      constants.message.NOTEXISTSTOKEN,
      constants.code.NOTEXISTSTOKEN
    )
  }
}
