import * as Koa from 'koa'
import { loggerMiddleware } from './middleware/logger'
import * as Cros from 'koa2-cors'
import { corsHandler } from './middleware/cors'
import * as bodyParser from 'koa-bodyparser'
import { errorHandler, responseHandler } from './middleware/response'
import { config } from './config'
import { publicRouter } from './route/public'
import { privateRouter } from './route/private'

const app = new Koa<
  Record<string, unknown>,
  {
    body: Record<string, unknown>
  }
>()

app.use(bodyParser())
app.use(Cros(corsHandler))
app.use(loggerMiddleware)
app.use(errorHandler)

app.use(privateRouter.routes())
app.use(privateRouter.allowedMethods())
app.use(publicRouter.routes())
app.use(publicRouter.allowedMethods())

app.use(responseHandler)
app.listen(config.port, () => {
  console.log(`server is running http://localhost:${config.port}`)
})
