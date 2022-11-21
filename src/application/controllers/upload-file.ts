import { UploadLocalFile } from '@/domain/usecases'
import { Controller } from '@/application/controllers'
import { HttpResponse } from '../helpers'

type HttpRequest = { file: { buffer: Buffer, mimeType: string, fileName: string } }

export class UploadFileController extends Controller {
  constructor (private readonly uploadLocalFile: UploadLocalFile) {
    super()
  }

  async perform ({ file }: HttpRequest): Promise<HttpResponse<any>> {
    await this.uploadLocalFile({ file })
    return {
      statusCode: 200,
      data: 'any_data'
    }
  }
}
