import * as Router from 'koa-router'
import * as Koa from 'koa'
import { TagValidator } from '../validator/tag'
import {
  createTag,
  deleteTagById,
  getTagById,
  getTagList,
  updateTag
} from '../service/tag'
import { TagInput } from '@/model/tag'
import { QueryConditions } from '@/types/model'

export const tagRouter = new Router()

tagRouter.post(
  '/add',
  TagValidator.add,
  async (ctx: Koa.Context, next: Koa.Next) => {
    const data = ctx.request.body as TagInput
    const res = await createTag(data)
    ctx.result = res
    await next()
  }
)

tagRouter.delete(
  '/del',
  TagValidator.delete,
  async (ctx: Koa.Context, next: Koa.Next) => {
    const { id } = ctx.request.body as any
    const res = await deleteTagById(id)
    ctx.result = res
    await next()
  }
)

tagRouter.get(
  '/tag',
  TagValidator.get,
  async (ctx: Koa.Context, next: Koa.Next) => {
    const id = Number(ctx.query.id)
    const res = await getTagById(id)
    ctx.result = res
    await next()
  }
)

tagRouter.post(
  '/list',
  TagValidator.list,
  async (ctx: Koa.Context, next: Koa.Next) => {
    const filters = ctx.request.body
    const res = await getTagList(
      filters as unknown as QueryConditions<TagInput>
    )
    ctx.result = res
    await next()
  }
)

tagRouter.put(
  '/update',
  TagValidator.update,
  async (ctx: Koa.Context, next: Koa.Next) => {
    const { id, ...data } = ctx.request.body as any
    const res = await updateTag(id, data)
    ctx.result = res
    await next()
  }
)
