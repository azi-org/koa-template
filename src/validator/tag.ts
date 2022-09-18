/**
 * 标签请求参数校验
 */

import * as Joi from 'joi'
import { ValidationError } from '../utils/errors'
import { generateValidator } from '../utils/validator'

const schemas = {
  add: Joi.object({
    name: Joi.string()
      .required()
      .pattern(/^[\u4e00-\u9fa5\w]{1,20}$/)
      .error(errors => {
        let message = ''
        switch (errors[0].code) {
          case 'any.required':
            message = '标签名必传'
            break
          case 'string.base':
          case 'string.pattern.base':
            message = '标签名必须由1-20位的汉字、字母或数字组成'
            break
        }
        return new ValidationError(message)
      }),
    desc: Joi.string()
      .required()
      .pattern(/^[\u4e00-\u9fa5\w]{3,50}$/)
      .error(errors => {
        let message = ''
        switch (errors[0].code) {
          case 'any.required':
            message = '标签描述必传'
            break
          case 'string.base':
          case 'string.pattern.base':
            message = '标签描述必须由3-50位的汉字、字母或数字组成'
            break
        }
        return new ValidationError(message)
      }),
    cate_id: Joi.number().required().error(new ValidationError('分类id必传'))
  }),
  delete: Joi.object({
    id: Joi.number().required().error(new ValidationError('标签id必传'))
  }),
  list: Joi.object({
    page: Joi.number()
      .required()
      .min(1)
      .error(errors => {
        let message = ''
        switch (errors[0].code) {
          case 'any.required':
            message = 'page是必须的'
            break
          case 'number.min':
            message = 'page最少为1'
            break
        }
        return new ValidationError(message)
      }),
    size: Joi.number()
      .min(5)
      .max(50)
      .required()
      .error(errors => {
        let message = ''
        switch (errors[0].code) {
          case 'any.required':
            message = 'size是必须的'
            break
          case 'number.min':
            message = 'size最少为1'
            break
          case 'number.max':
            message = 'size最多为50'
            break
        }
        return new ValidationError(message)
      }),
    params: Joi.array().error(err => new ValidationError(err[0].message))
  }),
  update: Joi.object({
    id: Joi.number().required().error(new ValidationError('标签id是必须的')),
    cate_id: Joi.number().error(
      errors => new ValidationError(errors[0].message)
    ),
    name: Joi.string()
      .pattern(/^[\u4e00-\u9fa5\w]{1,20}$/)
      .error(new ValidationError('标签名必须由1-20位的汉字、字母或数字组成')),
    desc: Joi.string()
      .pattern(/^[\u4e00-\u9fa5\w]{3,50}$/)
      .error(new ValidationError('标签描述必须由3-50位的汉字、字母或数字组成')),
    status: Joi.number()
      .valid(0, 1)
      .error(new ValidationError('标签状态只能为0和1'))
  })
}

export const TagValidator = {
  add: generateValidator(schemas, 'add'),
  delete: generateValidator(schemas, 'delete'),
  get: generateValidator(schemas, 'delete', 'query'),
  list: generateValidator(schemas, 'list'),
  update: generateValidator(schemas, 'update')
}
