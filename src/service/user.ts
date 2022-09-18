/**
 * 用户相关操作
 */

import { constants } from '../utils/constant'
import { User, UserInput, UserOutput } from '../model/user'
import { DBError } from '../utils/errors'
import { QueryConditions } from '../types/model'
import { generateQuery } from '../utils/query'

/**
 * 创建用户
 * @param payload
 * @returns
 */
export const createUser = async (payload: UserInput): Promise<boolean> => {
  try {
    const user = await User.findOne({
      where: {
        username: payload.username
      }
    })
    if (user) {
      return Promise.reject(
        new DBError(constants.message.USEREXITS, constants.code.USEREXITS)
      )
    }
    const newuser = await User.create(payload)
    return !!newuser
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 * 根据uuid删除用户
 * @param uuid
 * @returns
 */
export const deleteUserByUUId = async (uuid: string): Promise<boolean> => {
  try {
    const result = await User.destroy({
      where: {
        uuid
      }
    })
    return !!result
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 * 根据uuid批量删除用户
 * @param uuids
 * @returns
 */
export const batchDeleteUserById = async (
  uuids: string[]
): Promise<boolean> => {
  try {
    const result = await User.destroy({
      where: {
        uuid: uuids
      }
    })
    return !!result
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 * 根据uuid查询用户
 * @param uuid
 * @returns
 */
export const getUserByUUId = async (uuid: string): Promise<UserOutput> => {
  try {
    const user = await User.findOne({
      where: {
        uuid
      },
      attributes: {
        exclude: ['password']
      }
    })
    if (!user) {
      return Promise.reject(
        new DBError(
          constants.message.USERNOTEXSISTS,
          constants.code.USERNOTEXSISTS
        )
      )
    }
    return user
  } catch (err) {
    return Promise.reject(err)
  }
}

interface UserList {
  total: number
  page: number
  size: number
  data: UserOutput[]
}

/**
 * 条件查询用户
 * @param filters
 * @returns
 */
export const getUserList = async (
  filters: QueryConditions<UserInput>
): Promise<UserList> => {
  try {
    const where = generateQuery(filters.params)
    const { count, rows } = await User.findAndCountAll({
      where,
      limit: filters.size,
      offset: (filters.page - 1) * filters.size,
      order: [['created_at', 'DESC']],
      attributes: {
        exclude: ['password']
      }
    })
    return {
      total: count,
      data: rows,
      page: filters.page,
      size: filters.size
    }
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 * 更新用户
 * @param uuid
 * @param payload
 * @returns
 */
export const updateUser = async (
  uuid: string,
  payload: UserInput
): Promise<boolean> => {
  try {
    const user = await User.findOne({
      where: {
        uuid
      }
    })
    if (!user) {
      return Promise.reject(
        new DBError(
          constants.message.USERNOTEXSISTS,
          constants.code.USERNOTEXSISTS
        )
      )
    }
    const updatedUser = await User.update(payload, {
      where: {
        uuid
      }
    })
    return !!updatedUser
  } catch (err) {
    return Promise.reject(err)
  }
}
