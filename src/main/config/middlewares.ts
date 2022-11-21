import { bodyParser, contentType, cors } from '@/main/middlewares'

import { Express } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(contentType)
  app.use(cors)
}
