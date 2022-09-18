/**
 * 分类相关操作
 */

import { Category, CategoryInput, CategoryOutput } from '../model/category'
import { DBError } from '../utils/errors'

/**
 * 创建分类
 * @param payload
 * @returns
 */
export const createCate = async (
  payload: CategoryInput
): Promise<CategoryOutput> => {
  const cate = await Category.findOne({
    where: {
      name: payload.name
    }
  })
  if (cate) {
    return Promise.reject(new DBError('分类已存在'))
  }
  const category = await Category.create(payload)
  return category
}

/**
 * 根据id更新分类
 * @param id
 * @param payload
 * @returns
 */
export const updateCate = async (
  id: number,
  payload: Partial<CategoryInput>
): Promise<CategoryOutput> => {
  const category = await Category.findByPk(id)
  if (!category) {
    return Promise.reject(new DBError('分类不存在'))
  }
  const updatedCategory = await category.update(payload)
  return updatedCategory
}

/**
 * 根据id查找
 * @param id
 * @returns
 */
export const getCateById = async (id: number): Promise<CategoryOutput> => {
  const category = await Category.findByPk(id)
  if (!category) {
    return Promise.reject(new DBError('分类不存在'))
  }
  return category
}

/**
 * 根据id删除
 * @param id
 * @returns
 */
export const deleteCateById = async (id: number): Promise<boolean> => {
  const deletedCategory = await Category.destroy({
    where: { id }
  })
  return !!deletedCategory
}

/**
 * 根据id批量删除
 * @param ids
 * @returns
 */
export const batchDeleteCatesById = async (ids: number[]): Promise<boolean> => {
  const deletedCategory = await Category.destroy({
    where: {
      id: ids
    }
  })
  return !!deletedCategory
}

/**
 * 获取所有分类
 * @returns
 */
export const getAllCates = async (): Promise<CategoryOutput[]> => {
  const categories = await Category.findAll({
    where: {
      status: 1
    }
  })
  return categories
}
