/**
 * 生成查询条件
 */

import { Op } from 'sequelize'
import { ParamsTy } from '../types/model'

export const generateQuery = <T>(params: ParamsTy<T>) => {
  const where = {}
  if (params.length) {
    params.map(item => {
      where[item[0] as string] = {
        [Op[item[1]]]: item[1] === 'like' ? `%${item[2]}%` : item[2]
      }
    })
  }
  return where
}
