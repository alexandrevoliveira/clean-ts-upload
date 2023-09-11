import { LocalSystemFileStorage } from '@/infra/gateways'
import { WriteStream } from '@/infra/contracts/gateways'

import { MockProxy, mock } from 'jest-mock-extended'

describe('LocalSystemFileStorage', () => {
  let path: string
  let buffer: Buffer
  let fileName: string
  let stream: MockProxy<WriteStream>
  let sut: LocalSystemFileStorage

  beforeAll(async () => {
    path = 'any_path'
    buffer = Buffer.from('any_file_content')
    fileName = 'any_file_name.gz'
    stream = mock()
  })

  beforeEach(() => {
    sut = new LocalSystemFileStorage(path, stream)
  })

  it('should call WriteStream with correct input', async () => {
    await sut.upload({ file: buffer, fileName })

    expect(stream.writeOn).toHaveBeenCalledWith({ item: buffer, itemPath: `${path}/${fileName}` })
  })
})
