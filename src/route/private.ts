/**
 * 登录后才能访问的路由
 */

import * as Router from 'koa-router'
import { jwtHandler } from '../middleware/jwt'

export const privateRouter = new Router()

privateRouter.prefix('api/member')
privateRouter.use(jwtHandler)
