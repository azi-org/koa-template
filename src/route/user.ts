/**
 * 用户模块
 */
import * as Router from 'koa-router'
import * as Koa from 'koa'
import { userValidator } from '../validator/user'
import {
  createUser,
  deleteUserByUUId,
  getUserByUUId,
  getUserList,
  updateUser
} from '../service/user'
import { UserInput } from '@/model/user'
import { QueryConditions } from '@/types/model'

export const userRouter = new Router()

userRouter.post(
  '/add',
  userValidator.add,
  async (ctx: Koa.Context, next: Koa.Next) => {
    const data = ctx.request.body
    const res = await createUser(data as UserInput)
    ctx.result = res
    await next()
  }
)

userRouter.delete(
  '/del',
  userValidator.delete,
  async (ctx: Koa.Context, next: Koa.Next) => {
    const { uuid } = ctx.request.body as any
    const res = await deleteUserByUUId(uuid)
    ctx.result = res
    await next()
  }
)

userRouter.get(
  '/user',
  userValidator.get,
  async (ctx: Koa.Context, next: Koa.Next) => {
    const uuid = ctx.query.uuid as string
    const res = await getUserByUUId(uuid)
    ctx.result = res
    await next()
  }
)

userRouter.post(
  '/list',
  userValidator.list,
  async (ctx: Koa.Context, next: Koa.Next) => {
    const data = ctx.request.body
    const res = await getUserList(data as unknown as QueryConditions<UserInput>)
    ctx.result = res
    await next()
  }
)

userRouter.put(
  '/update',
  userValidator.update,
  async (ctx: Koa.Context, next: Koa.Next) => {
    const { uuid, ...data } = ctx.request.body as any
    const res = await updateUser(uuid, data)
    ctx.result = res
    await next()
  }
)
