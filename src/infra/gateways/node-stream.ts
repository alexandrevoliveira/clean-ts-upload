import { WriteStream } from '@/infra/contracts/gateways'
import { createWriteStream } from 'fs'
import { Readable, ReadableOptions, pipeline } from 'stream'
import { promisify } from 'util'

export class NodeStream implements WriteStream {
  async writeOn ({ item, itemPath }: WriteStream.Input): WriteStream.Output {
    const pipelineAsync = promisify(pipeline)
    const readStream = new MultiStream(item, {})
    const writeStream = createWriteStream(itemPath)
    await pipelineAsync(
      readStream,
      writeStream
    )
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
