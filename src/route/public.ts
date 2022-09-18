/**
 * 无需登录的路由
 */

import * as Router from 'koa-router'
// import { jwtHandler } from '../middleware/jwt'
import { cateRouter } from './category'
import { tagRouter } from './tag'
import { userRouter } from './user'

export const publicRouter = new Router()

publicRouter.prefix('/api/index')

// publicRouter.use(jwtHandler)

publicRouter.use('/cate', cateRouter.routes(), cateRouter.allowedMethods())
publicRouter.use('/tag', tagRouter.routes(), tagRouter.allowedMethods())
publicRouter.use('/user', userRouter.routes(), userRouter.allowedMethods())
