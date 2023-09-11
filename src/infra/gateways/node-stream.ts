import { WriteStream } from '@/infra/contracts/gateways'
import { createWriteStream } from 'fs'
import { Readable, ReadableOptions, pipeline } from 'stream'
import { promisify } from 'util'

export class NodeStream implements WriteStream {
  async writeOn ({ item, itemPath }: WriteStream.Input): WriteStream.Output {
    const pipelineAsync = promisify(pipeline)
    const readStream = MultiStream.readStream({ item })
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

export class MultiStream extends Readable {
  multiStreamOptions?: object

  private constructor (
    private item: any,
    options: ReadableOptions = {}
  ) {
    super(options)
  }

  static readStream ({ item, options }: ReadStreamInput): MultiStream {
    const multiStreamOptions = item instanceof Buffer || typeof item === 'string' ? options : { objectMode: true }
    const multiStream = new MultiStream(item, multiStreamOptions)
    multiStream.multiStreamOptions = multiStreamOptions
    return multiStream
  }

  override _read = (): void => {
    this.push(this.item)
    this.push(null)
    this.item = null
  }
}
