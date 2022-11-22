import { adaptExpressRoute, adaptMulter } from '@/main/adapters'
import { makeUploadFileController } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/files/upload', adaptMulter, adaptExpressRoute(makeUploadFileController()))
}
