import { NodeStream } from '@/infra/gateways'
import { exec } from 'child_process'
import { readdirSync } from 'fs'
import { promisify } from 'util'

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
