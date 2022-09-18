/**
 * 请求响应处理以及全局错误处理
 */

import * as Koa from 'koa'
import { constants } from '../utils/constant'
import {
  DBError,
  ForbiddenError,
  TokenError,
  ValidationError
} from '../utils/errors'
import { logger } from './logger'

export const responseHandler = async (ctx: Koa.Context, next: Koa.Next) => {
  if (ctx.result !== undefined) {
    ctx.type = 'json'
    ctx.body = {
      code: constants.code.OPERATESUCCESSFULLY,
      msg: ctx.msg || constants.message.OPERATESUCCESSFULLY,
      data: ctx.result || null
    }
    await next()
  }
}

export const errorHandler = async (ctx: Koa.Context, next: Koa.Next) => {
  return next().catch((err: any) => {
    if (err instanceof ForbiddenError) {
      ctx.status = 403
    } else if (err instanceof TokenError) {
      ctx.status = 401
    } else if (err instanceof DBError) {
      ctx.status = 421
    } else if (err instanceof ValidationError) {
      ctx.status = 422
    }

    logger.error(err.message)

    ctx.body = {
      code: err.code || constants.code.UNKNOWN,
      msg: err.message || constants.message.UNKNOWN,
      data: err.type || null
    }

    return Promise.resolve()
  })
}
