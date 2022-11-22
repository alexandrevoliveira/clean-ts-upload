import { LocalSystemFileStorage } from '@/infra/gateways'
import { env } from '@/main/config/env'

export const makeLocalSystemFileStorage = (): LocalSystemFileStorage => {
  return new LocalSystemFileStorage(env.paths.upload)
}
