/**
 * 常量定义
 */
import * as path from 'path'

const resolve = (...args: string[]): string =>
  path.resolve(__dirname, '../../', ...args)

export const paths: Record<string, string> = {
  LOGPATH: resolve('log'),
  PUBLICPATH: resolve('public')
}

export const constants: Record<string, Record<string, string>> = {
  message: {
    PARAMAERROR: '请求参数错误',
    USEREXITS: '用户已注册',
    INVALIDPASSWORD: '用户名或密码不正确',
    USERNOTEXSISTS: '用户不存在',
    INVALIDEMAIL: '邮箱格式不正确',
    INVALIDTOKEN: '无效token',
    TOKENEXPIRED: 'token已过期',
    SERVERINNERERROR: '服务器内部错误',
    UNKNOWN: '未知错误',
    FORBBIDEN: '无权访问',
    OPERATESUCCESSFULLY: '操作成功',
    INVALIDDBOPERATION: '数据异常',
    NOTEXISTSTOKEN: 'token不存在',
    TOKENNOTBEFORE: 'token未生效',
    TOKENERROR: 'token异常',
    TAGEXISTS: '标签已存在',
    TAGNOTEXISTS: '标签不存在',
    CATEGORYNOTEXISTS: '分类不存在'
  },
  code: {
    PARAMAERROR: '10001',
    USEREXITS: '10002',
    INVALIDPASSWORD: '10003',
    USERNOTEXSISTS: '10004',
    INVALIDEMAIL: '10005',
    INVALIDTOKEN: '10006',
    TOKENEXPIRED: '10007',
    SERVERINNERERROR: '10008',
    UNKNOWN: '10009',
    FORBBIDEN: '10010',
    OPERATESUCCESSFULLY: '10011',
    INVALIDDBOPERATION: '10012',
    NOTEXISTSTOKEN: '10013',
    TOKENNOTBEFORE: '10014',
    TOKENERROR: '10015',
    TAGEXISTS: '10016',
    TAGNOTEXISTS: '10017',
    CATEGORYNOTEXISTS: '10018'
  }
}
