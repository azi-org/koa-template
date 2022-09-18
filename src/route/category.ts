/**
 * 分类模块
 */

import * as Router from 'koa-router'
import * as Koa from 'koa'
import {
  createCate,
  deleteCateById,
  getAllCates,
  getCateById,
  updateCate
} from '../service/category'
import { cateValidator } from '../validator'
import { CategoryInput } from '@/model/category'

export const cateRouter = new Router()

cateRouter.post(
  '/add',
  cateValidator.add,
  async (ctx: Koa.Context, next: Koa.Next) => {
    const data = ctx.request.body as CategoryInput
    const res = await createCate(data)
    ctx.result = res
    await next()
  }
)

cateRouter.get(
  '/cate',
  cateValidator.get,
  async (ctx: Koa.Context, next: Koa.Next) => {
    const { id } = ctx.request.query
    const cid = Number(id)
    const res = await getCateById(cid)
    ctx.result = res
    await next()
  }
)

cateRouter.get('/all', async (ctx: Koa.Context, next: Koa.Next) => {
  const res = await getAllCates()
  ctx.result = res
  await next()
})

cateRouter.delete(
  '/del',
  cateValidator.delete,
  async (ctx: Koa.Context, next: Koa.Next) => {
    const { id } = ctx.request.body as any
    const res = await deleteCateById(id)
    ctx.result = res
    await next()
  }
)

cateRouter.put(
  '/update',
  cateValidator.update,
  async (ctx: Koa.Context, next: Koa.Next) => {
    const { id, ...data } = ctx.request.body as any
    console.log(id, data)
    const res = await updateCate(id, data)
    ctx.result = res
    await next()
  }
)
