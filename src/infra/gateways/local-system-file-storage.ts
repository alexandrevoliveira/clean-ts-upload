import { UploadFile } from '@/domain/contracts/gateways'
import { WriteStream } from '@/infra/contracts/gateways'

export class LocalSystemFileStorage implements UploadFile {
  constructor (
    private readonly path: string,
    private readonly stream: WriteStream
  ) {}

  async upload ({ file, fileName }: UploadFile.Input): Promise<UploadFile.Output> {
    const filePath = `${this.path}/${fileName}`
    await this.stream.writeOn({ item: file, itemPath: filePath })
    return undefined
  }
}
