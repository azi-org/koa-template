/**
 * 跨域中间件
 */

export const corsHandler = {
  origin: function () {
    return '*'
  },
  exposeHeaders: ['Authorization'],
  maxAge: 5 * 24 * 60 * 60,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requestd-With']
}
