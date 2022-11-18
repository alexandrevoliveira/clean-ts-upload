import { UploadLocalFile } from '@/domain/usecases'

type HttpRequest = { file: { buffer: Buffer, mimeType: string, fileName: string } }

export class UploadFileController {
  constructor (private readonly uploadLocalFile: UploadLocalFile) {}

  async handle ({ file }: HttpRequest): Promise<void> {
    await this.uploadLocalFile({ file })
  }
}
