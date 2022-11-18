import { LocalSystemFileStorage } from '@/infra/gateways'

import { exec } from 'child_process'
import { readdirSync, unlinkSync } from 'fs'
import { join } from 'path'
import { promisify } from 'util'

describe('LocalSystemFileStorage', () => {
  let sut: LocalSystemFileStorage
  let path: string
  let buffer: Buffer
  let fileName: string

  beforeAll(async () => {
    const execAsync = promisify(exec)
    await execAsync('node -e "process.stdout.write(crypto.randomBytes(1e7))" > $(pwd)/src/tmp/a.gz')
    path = join(__dirname, '../../../src/tmp')
    buffer = Buffer.from(`${path}/a.gz`)
    fileName = 'any_file_name.gz'
  })

  beforeEach(() => {
    sut = new LocalSystemFileStorage(path)
  })

  afterAll(() => {
    const dirFiles = readdirSync(path)
    for (const dirFile of dirFiles) {
      unlinkSync(`${path}/${dirFile}`)
    }
  })

  it('should upload file locally using stream method', async () => {
    await sut.upload({ file: buffer, fileName })

    const dir = readdirSync(path)

    expect(dir.length).toBeGreaterThanOrEqual(2)
  })
})
