import { Tag, TagInput, TagOut } from '../model/tag'
import { QueryConditions } from '../types/model'
import { constants } from '../utils/constant'
import { DBError } from '../utils/errors'
import { generateQuery } from '../utils/query'

/**
 * 新建标签
 * @param payload
 * @returns
 */
export const createTag = async (payload: TagInput): Promise<TagOut> => {
  const { name } = payload
  const tag = await Tag.findOne({
    where: {
      name
    }
  })
  if (tag) {
    return Promise.reject(
      new DBError(constants.message.TAGEXISTS, constants.code.TAGEXISTS)
    )
  }
  const res = await Tag.create(payload)
  return res
}

/**
 * 根据id删除标签
 * @param id
 * @returns
 */
export const deleteTagById = async (id: number): Promise<boolean> => {
  const res = await Tag.destroy({
    where: {
      id
    }
  })
  return !!res
}

/**
 * 根据id查询标签你
 * @param id
 * @returns
 */
export const getTagById = async (id: number): Promise<TagOut> => {
  const tag = await Tag.findByPk(id)
  if (!tag) {
    return Promise.reject(
      new DBError(constants.message.TAGNOTEXISTS, constants.code.TAGNOTEXISTS)
    )
  }
  return tag
}

interface TagList {
  total: number
  page: number
  size: number
  data: TagOut[]
}

/**
 * 条件查询标签
 * @param filters
 * @returns
 */
export const getTagList = async (
  filters: QueryConditions<TagInput>
): Promise<TagList> => {
  const where = generateQuery(filters.params)
  const { count, rows } = await Tag.findAndCountAll({
    where,
    limit: filters.size,
    offset: (filters.page - 1) * filters.size,
    order: [['created_at', 'DESC']]
  })
  return {
    total: count,
    data: rows,
    page: filters.page,
    size: filters.size
  }
}

export const updateTag = async (
  id: number,
  payload: TagInput
): Promise<boolean> => {
  const tag = await Tag.findByPk(id)
  if (!tag) {
    return Promise.reject(
      new DBError(constants.message.TAGNOTEXISTS, constants.code.TAGNOTEXISTS)
    )
  }
  const res = await Tag.update(payload, {
    where: {
      id
    }
  })
  return !!res
}
