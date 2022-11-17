import { UploadFile } from '@/domain/contracts/gateways'
import { setupUploadLocalFile, UploadLocalFile } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UploadLocalFile', () => {
  let buffer: Buffer
  let mimeType: string
  let fileName: string
  let fileStorage: MockProxy<UploadFile>
  let sut: UploadLocalFile

  beforeAll(() => {
    buffer = Buffer.from('any_buffer')
    mimeType = 'application/gzip'
    fileName = 'any_file_name'
    fileStorage = mock()
  })

  beforeEach(() => {
    sut = setupUploadLocalFile(fileStorage)
  })

  it('should call UploadFile with correct input', async () => {
    await sut({ file: { buffer, mimeType, fileName } })

    expect(fileStorage.upload).toHaveBeenCalledWith({ file: buffer, fileName })
  })
})
