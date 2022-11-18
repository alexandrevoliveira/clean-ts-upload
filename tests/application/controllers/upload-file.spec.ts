import { UploadFileController } from '@/application/controllers'

describe('UploadFileController', () => {
  let buffer: Buffer
  let mimeType: string
  let fileName: string
  let file: { buffer: Buffer, mimeType: string, fileName: string }
  let uploadLocalFile: jest.Mock
  let sut: UploadFileController

  beforeAll(() => {
    buffer = Buffer.from('any_buffer')
    mimeType = 'application/gzip'
    fileName = 'any_file_name'
    file = { buffer, mimeType, fileName }
    uploadLocalFile = jest.fn()
  })

  beforeEach(() => {
    sut = new UploadFileController(uploadLocalFile)
  })

  it('should call UploadLocalFile with correct input', async () => {
    await sut.handle({ file })

    expect(uploadLocalFile).toHaveBeenCalledWith({ file })
    expect(uploadLocalFile).toHaveBeenCalledTimes(1)
  })
})
