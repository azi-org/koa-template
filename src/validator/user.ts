/**
 * 用户请求参数校验
 */
import * as Joi from 'joi'
import { ValidationError } from '../utils/errors'
import { generateValidator } from '../utils/validator'

const schemas = {
  add: Joi.object({
    username: Joi.string()
      .required()
      .pattern(/^[\w]{3,10}/)
      .error(errors => {
        let message = ''
        switch (errors[0].code) {
          case 'any.required':
            message = '用户名是必须的'
            break
          case 'string.base':
          case 'string.pattern.base':
            message = '用户名必须由3-10个大小写字母或数字组成'
            break
        }
        return new ValidationError(message)
      }),
    password: Joi.string()
      .required()
      .pattern(/^[\w]{6,16}$/)
      .error(errors => {
        let message = ''
        switch (errors[0].code) {
          case 'any.required':
            message = '密码是必须的'
            break
          case 'string.base':
          case 'string.pattern.base':
            message = '密码必须由6-16位的大小写字母或数字组成'
            break
        }
        return new ValidationError(message)
      })
  }),
  get: Joi.object({
    uuid: Joi.string().required().error(new ValidationError('用户uuid是必须的'))
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
    uuid: Joi.string()
      .required()
      .error(new ValidationError('用户uuid是必须的')),
    username: Joi.string()
      .pattern(/^[\w]{3,10}$/)
      .error(new ValidationError('用户名必须由3-10个大小写字母或数字组成')),
    password: Joi.string()
      .pattern(/^[\w]{6,16}$/)
      .error(new ValidationError('密码必须由6-16位的大小写字母或数字组成')),
    email: Joi.string().email().error(new ValidationError('邮箱格式不正确')),
    nickname: Joi.string()
      .pattern(/^[\u4e00-\u9fa5\w]{3,10}$/)
      .error(
        new ValidationError(
          '用户昵称格式错误，必须由3-10个汉字、字母或数字组成'
        )
      ),
    gender: Joi.number()
      .valid(0, 1, 2)
      .error(new ValidationError('用户性别格式错误')),
    birthday: Joi.date().error(new ValidationError('用户生日格式错误')),
    brief: Joi.string()
      .pattern(/^[\u4e00-\u9fa5\w]{0,100}$/)
      .error(new ValidationError('用户简介为0-100个字符')),
    address: Joi.string()
      .pattern(/[^\s]/)
      .error(new ValidationError('用户简介格式错误')),
    status: Joi.number()
      .valid(0, 1)
      .error(err => new ValidationError(err[0].message)),
    company: Joi.string().error(err => new ValidationError(err[0].message)),
    avatar: Joi.string()
      .pattern(/^http[s]?:\/\/[\w-/.]+/)
      .error(new ValidationError('用户头像地址格式错误'))
  })
}

export const userValidator = {
  add: generateValidator(schemas, 'add'),
  get: generateValidator(schemas, 'get', 'query'),
  delete: generateValidator(schemas, 'get'),
  list: generateValidator(schemas, 'list'),
  update: generateValidator(schemas, 'update')
}
