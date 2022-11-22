import { setupUploadLocalFile, UploadLocalFile } from '@/domain/usecases'
import { makeLocalSystemFileStorage, makeUniqueId } from '@/main/factories/infra/gateways'

export const makeUploadLocalFile = (): UploadLocalFile => {
  return setupUploadLocalFile(
    makeLocalSystemFileStorage(),
    makeUniqueId()
  )
}
