import { UploadFile } from '@/domain/contracts/gateways'

type Setup = (fileStorage: UploadFile) => UploadLocalFile
type Input = { file: { buffer: Buffer, mimeType: string, fileName: string } }
type Output = { fileName: string }
export type UploadLocalFile = (input: Input) => Promise<Output>

export const setupUploadLocalFile: Setup = (fileStorage) => async ({ file }) => {
  await fileStorage.upload({ file: file.buffer, fileName: file.fileName })
  return { fileName: '' }
}
