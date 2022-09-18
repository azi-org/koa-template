/**
 * 模型类型声明文件
 */

// [['username', 'like', ''], ['age', 'eq', 18], ['created_at', 'between', ['2022-08-09 12:11:11', '2022-08-20 13:12:45']]]
export type OperationTy = 'eq' | 'like' | 'between'

export type ParamsTy<T> = Array<
  [keyof T, OperationTy, string | number | [string, string]]
>

export interface QueryConditions<T> {
  page: number
  size: number
  params: ParamsTy<T>
}
