import { UploadFileController } from '@/application/controllers'
import { makeUploadLocalFile } from '@/main/factories/domain/usecases'

export const makeUploadFileController = (): UploadFileController => {
  return new UploadFileController(makeUploadLocalFile())
}
