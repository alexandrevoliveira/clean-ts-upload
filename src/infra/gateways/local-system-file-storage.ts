import { UploadFile } from '@/domain/contracts/gateways'

import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'

export class LocalSystemFileStorage implements UploadFile {
  constructor (private readonly path: string) {}

  async upload ({ file, fileName }: UploadFile.Input): Promise<UploadFile.Output> {
    const pipelineAsync = promisify(pipeline)
    const filePath = `${this.path}/${fileName}`
    await pipelineAsync(
      createReadStream(file),
      createWriteStream(filePath)
    )
    return undefined
  }
}
