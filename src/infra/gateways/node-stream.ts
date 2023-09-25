import { WriteStream } from '@/infra/contracts/gateways'

import { createWriteStream } from 'fs'
import { Readable, ReadableOptions, pipeline } from 'stream'
import { promisify } from 'util'

export class NodeStream implements WriteStream {
  async writeOn ({ item, itemPath }: WriteStream.Input): WriteStream.Output {
    const pipelineAsync = promisify(pipeline)
    const readStream = ReadStream.execute({ item })
    const writeStream = createWriteStream(itemPath)
    await pipelineAsync(
      readStream,
      writeStream
    )
  }
}

type ReadStreamInput = {
  item: any
  options?: object
}

export class ReadStream extends Readable {
  readStreamOptions?: object

  private constructor (
    private item: any,
    options: ReadableOptions = {}
  ) {
    super(options)
  }

  static execute ({ item, options }: ReadStreamInput): ReadStream {
    const readStreamOptions = item instanceof Buffer || typeof item === 'string' ? options : { objectMode: true }
    const multiStream = new ReadStream(item, readStreamOptions)
    multiStream.readStreamOptions = readStreamOptions
    return multiStream
  }

  override _read = (): void => {
    this.push(this.item)
    this.push(null)
    this.item = null
  }
}
