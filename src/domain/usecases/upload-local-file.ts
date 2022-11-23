import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { UploadError } from '../entities/errors'

type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator) => UploadLocalFile
type Input = { file: { buffer: Buffer, mimeType: string, fileName: string } }
type Output = { fileName: string }
export type UploadLocalFile = (input: Input) => Promise<Output>

export const setupUploadLocalFile: Setup = (fileStorage, crypto) => async ({ file }) => {
  const uniqueFileName = crypto.uuid({ key: file.fileName })
  const uploadResponse = await fileStorage.upload({ file: file.buffer, fileName: uniqueFileName })
  if (uploadResponse instanceof Error) throw new UploadError()
  return { fileName: uniqueFileName }
}
