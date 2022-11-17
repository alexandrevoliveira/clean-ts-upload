import { UploadFile } from '@/domain/contracts/gateways'
import { UploadError } from '../entities/errors'

type Setup = (fileStorage: UploadFile) => UploadLocalFile
type Input = { file: { buffer: Buffer, mimeType: string, fileName: string } }
type Output = { fileName: string }
export type UploadLocalFile = (input: Input) => Promise<Output>

export const setupUploadLocalFile: Setup = (fileStorage) => async ({ file }) => {
  const uploadResponse = await fileStorage.upload({ file: file.buffer, fileName: file.fileName })
  if (uploadResponse instanceof Error) throw new UploadError(file.fileName)
  return { fileName: file.fileName }
}
