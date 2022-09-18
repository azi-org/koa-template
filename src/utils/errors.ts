/**
 * 异常类扩展
 */
import { constants } from './constant'

/**
 * 禁止访问
 */
export class ForbiddenError extends Error {
  code!: string
  type: string = constants.message.FORBBIDEN
  constructor(
    message: string = constants.message.FORBBIDEN,
    code: string = constants.code.FORBBIDEN
  ) {
    super(message)
    this.code = code
  }
}

/**
 * token异常
 */
export class TokenError extends Error {
  code!: string
  type: string = constants.message.TOKENERROR
  constructor(
    message: string = constants.message.INVALIDTOKEN,
    code: string = constants.code.INVALIDTOKEN
  ) {
    super(message)
    this.code = code
  }
}

/**
 * 数据库操作异常
 */
export class DBError extends Error {
  code!: string
  type: string = constants.message.INVALIDDBOPERATION
  constructor(
    message: string = constants.message.INVALIDDBOPERATION,
    code: string = constants.code.INVALIDDBOPERATION
  ) {
    super(message)
    this.code = code
  }
}

/**
 * 参数校验异常
 */
export class ValidationError extends Error {
  code!: string
  type: string = constants.message.PARAMAERROR
  constructor(
    message: string = constants.message.PARAMAERROR,
    code: string = constants.code.PARAMAERROR
  ) {
    super(message)
    this.code = code
  }
}
