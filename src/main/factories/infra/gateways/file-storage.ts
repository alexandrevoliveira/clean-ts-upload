import { LocalSystemFileStorage } from '@/infra/gateways'
import { env } from '@/main/config/env'
import { makeNodeStream } from '@/main/factories/infra/gateways'

export const makeLocalSystemFileStorage = (): LocalSystemFileStorage => {
  return new LocalSystemFileStorage(env.paths.upload, makeNodeStream())
}
