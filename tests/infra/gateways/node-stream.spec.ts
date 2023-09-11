import { MultiStream, NodeStream } from '@/infra/gateways'
import { exec } from 'child_process'
import { readdirSync } from 'fs'
import { promisify } from 'util'

describe('Streams', () => {
  describe('NodeStream', () => {
    let itemPath: string
    let file: Buffer
    let sut: NodeStream

    beforeAll(async () => {
      file = Buffer.from('any_file_content')
      itemPath = 'tmp/any_file.csv'
    })

    beforeEach(() => {
      sut = new NodeStream()
    })

    afterEach(async () => {
      const execAsync = promisify(exec)
      await execAsync('rm -rf tmp/any_file.csv')
    })

    it('should write on right path', async () => {
      await sut.writeOn({ item: file, itemPath })

      const dir = readdirSync('tmp')

      expect(dir).toContain('any_file.csv')
    })
  })

  describe('MultiStream', () => {
    it('should have undefined options if file is instanceof Buffer or typeof string', async () => {
      const file = Buffer.from('any_file_content')

      const sut = MultiStream.readStream({ item: file })

      expect(sut.multiStreamOptions).toBeUndefined()
    })

    it('should have options with objectMode equal to true if file is neither instanceof Buffer nor typeof string', async () => {
      const file = { anything: 'any_object' }

      const sut = MultiStream.readStream({ item: file })

      expect(sut.multiStreamOptions).toEqual({ objectMode: true })
    })
  })
})
