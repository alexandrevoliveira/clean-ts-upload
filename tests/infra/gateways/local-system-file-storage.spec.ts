import { LocalSystemFileStorage } from '@/infra/gateways'

import { exec } from 'child_process'
import { readdirSync } from 'fs'
import { join } from 'path'
import { promisify } from 'util'

describe('LocalSystemFileStorage', () => {
  let sut: LocalSystemFileStorage
  let path: string
  let buffer: Buffer
  let fileName: string

  beforeAll(async () => {
    const execAsync = promisify(exec)
    await execAsync('mkdir -p $(pwd)/tmp')
    await execAsync('node -e "process.stdout.write(crypto.randomBytes(1e7))" > $(pwd)/tmp/a.gz')
    path = join(__dirname, '../../../tmp')
    buffer = Buffer.from(`${path}/a.gz`)
    fileName = 'any_file_name.gz'
  })

  beforeEach(() => {
    sut = new LocalSystemFileStorage(path)
  })

  afterAll(async () => {
    const execAsync = promisify(exec)
    await execAsync('rm -rf $(pwd)/tmp')
  })

  it('should upload file locally using stream method', async () => {
    await sut.upload({ file: buffer, fileName })

    const dir = readdirSync(path)

    expect(dir.length).toBeGreaterThanOrEqual(2)
  })
})
