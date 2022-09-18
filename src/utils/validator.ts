/**
 * 生成验证器
 */
import Joi from 'joi'
import * as Koa from 'koa'

export type ParamsType = 'body' | 'params' | 'query'

export function generateValidator(
  schemas: Record<string, Joi.ObjectSchema<any>>,
  type: string,
  pt: ParamsType = 'body'
) {
  return async function (ctx: Koa.Context, next: Koa.Next) {
    const data =
      pt === 'body'
        ? ctx.request.body
        : pt === 'params'
        ? ctx.params
        : ctx.query
    await schemas[type].validateAsync(data)
    await next()
  }
}
