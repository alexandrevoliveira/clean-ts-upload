import { UploadFile } from '@/domain/contracts/gateways'

import { createWriteStream } from 'fs'
import { pipeline, Readable, ReadableOptions } from 'stream'
import { promisify } from 'util'

export class LocalSystemFileStorage implements UploadFile {
  constructor (private readonly path: string) {}

  async upload ({ file, fileName }: UploadFile.Input): Promise<UploadFile.Output> {
    const pipelineAsync = promisify(pipeline)
    const filePath = `${this.path}/${fileName}`
    const readStream = new MultiStream(file, {})
    const writeStream = createWriteStream(filePath)
    await pipelineAsync(
      readStream,
      writeStream
    )
    return undefined
  }
}

class MultiStream extends Readable {
  constructor (private object: any, options: ReadableOptions) {
    super(object instanceof Buffer || typeof object === 'string' ? options : { objectMode: true })
  }

  override _read = (): void => {
    this.push(this.object)
    this.push(null)
    this.object = null
  }
}
