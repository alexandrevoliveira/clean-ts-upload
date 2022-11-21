import { UploadLocalFile } from '@/domain/usecases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ValidationBuilder, Validator } from '@/application/validation'

type HttpRequest = { file: { buffer: Buffer, mimeType: string, fileName: string } }
type Model = { fileName: string }

export class UploadFileController extends Controller {
  constructor (private readonly uploadLocalFile: UploadLocalFile) {
    super()
  }

  async perform ({ file }: HttpRequest): Promise<HttpResponse<Model>> {
    const fileName = await this.uploadLocalFile({ file })
    return ok(fileName)
  }

  override buildValidators ({ file }: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder.of({ value: file, fieldName: 'file' }).required().file({ allowed: ['gz'] }).build()
    ]
  }
}
