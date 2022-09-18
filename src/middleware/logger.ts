/**
 * 日志记录中间件
 */

import * as Koa from 'koa'
import { paths } from '../utils/constant'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as log4js from 'log4js'

const logsdir = path.parse(paths.LOGPATH).dir
if (!fs.existsSync(logsdir)) {
  fs.mkdirSync(logsdir)
}

log4js.configure({
  appenders: {
    console: { type: 'console' },
    httpFile: {
      type: 'dateFile',
      filename: `${paths.LOGPATH}/http/${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}.log`
    }
  },
  categories: {
    default: {
      appenders: ['console', 'httpFile'],
      level: 'info'
    }
  }
})

export const logger = log4js.getLogger('[Default]')

export const loggerMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  const remoteAddress =
    ctx.header['x-forwarded-for'] ||
    ctx.ip ||
    ctx.ips ||
    (ctx.socket && ctx.socket.remoteAddress)
  const logtext = `请求方式:${ctx.method.toUpperCase()}--状态:${
    ctx.status
  }--请求地址:${ctx.url}--请求数据:${JSON.stringify(
    ctx.method.toUpperCase() === 'GET' ? ctx.request.query : ctx.request.body
  )}--响应数据:${JSON.stringify(
    ctx.body
  )}--ip:${remoteAddress}--请求时间:${ms}ms`
  logger.info(logtext)
}
