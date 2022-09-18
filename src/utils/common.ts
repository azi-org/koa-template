/**
 * 时间格式化
 * @param datestring
 * @returns
 */
export const dateFormat = (datestring: undefined | Date) => {
  if (!datestring) return null
  const date = new Date(datestring)

  const Y = date.getFullYear()
  const M = (date.getMonth() + 1 + '').padStart(2, '0')
  const D = (date.getDate() + '').padStart(2, '0')

  const hh = (date.getHours() + '').padStart(2, '0')
  const mm = (date.getMinutes() + '').padStart(2, '0')
  const ss = (date.getSeconds() + '').padStart(2, '0')

  return `${Y}-${M}-${D} ${hh}:${mm}:${ss}`
}
