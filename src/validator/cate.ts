/**
 * 分类请求参数验证
 */
import * as Joi from 'joi'
import { ValidationError } from '../utils/errors'
import { generateValidator } from '../utils/validator'

const schemas = {
  add: Joi.object({
    name: Joi.string()
      .required()
      .pattern(/^[\u4e00-\u9fa5A-Za-z\d]{3,20}$/)
      .error(error => {
        let message = ''
        switch (error[0].code) {
          case 'any.required':
            message = '分类名称必传'
            break
          case 'string.base':
          case 'string.pattern.base':
            message = '分类名称必须由3-20个汉字、字母和数字组成'
            break
        }
        return new ValidationError(message)
      }),
    desc: Joi.string()
      .required()
      .pattern(/^[^\s]{10,255}$/)
      .error(errors => {
        let message = ''
        switch (errors[0].code) {
          case 'any.required':
            message = '分类描述必填'
            break
          case 'string.base':
          case 'string.pattern.base':
            message = '分类描述必须由10-255个汉字、字母或数字组成'
        }
        return new ValidationError(message)
      }),
    type: Joi.string()
      .required()
      .valid('BLOG', 'NOTES', 'OTHERS')
      .error(errors => {
        let message = ''
        switch (errors[0].code) {
          case 'any.required':
            message = '分类类型必传'
            break
          case 'string.base':
          case 'any.only':
            message = '分类类别只能为BLOG/NOTES/OTHERS'
            break
        }
        return new ValidationError(message)
      })
  }),
  update: Joi.object({
    id: Joi.number().required().error(new ValidationError('分类ID必传')),
    name: Joi.string()
      .pattern(/^[\u4e00-\u9fa5A-Za-z\d]{3,20}$/)
      .error(new ValidationError('分类名称必须由3-20个汉字、字母和数字组成')),
    desc: Joi.string()
      .pattern(/^[^\s]{10,255}$/)
      .error(new ValidationError('分类描述必须由10-255个汉字、字母或数字组成')),
    type: Joi.string()
      .valid('BLOG', 'NOTES', 'OTHERS')
      .error(errors => {
        let message = ''
        switch (errors[0].code) {
          case 'string.base':
          case 'any.only':
            message = '分类类别只能为BLOG/NOTES/OTHERS'
            break
        }
        return new ValidationError(message)
      }),
    status: Joi.number()
      .valid(0, 1)
      .error(errors => {
        let message = ''
        switch (errors[0].code) {
          case 'string.base':
          case 'any.only':
            message = '分类状态只能为0 1'
            break
        }
        return new ValidationError(message)
      })
  }),
  delete: Joi.object({
    id: Joi.number().required().error(new ValidationError('分类id必传'))
  })
}

export const cateValidator = {
  add: generateValidator(schemas, 'add'),
  update: generateValidator(schemas, 'update'),
  delete: generateValidator(schemas, 'delete'),
  get: generateValidator(schemas, 'delete', 'query')
}
