import { Controller, UploadFileController } from '@/application/controllers'
import { AllowedMimeTypes, Required, RequiredBuffer } from '@/application/validation'

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
    uploadLocalFile = jest.fn().mockResolvedValue({ fileName })
  })

  beforeEach(() => {
    sut = new UploadFileController(uploadLocalFile)
  })

  it('should extend Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build validators correctly', () => {
    const validators = sut.buildValidators({ file })

    expect(validators).toEqual([
      new Required(file, 'file'),
      new RequiredBuffer(file.buffer, 'file'),
      new AllowedMimeTypes(['gz'], mimeType)
    ])
  })

  it('should call UploadLocalFile with correct input', async () => {
    await sut.handle({ file })

    expect(uploadLocalFile).toHaveBeenCalledWith({ file })
    expect(uploadLocalFile).toHaveBeenCalledTimes(1)
  })

  it('should return 200 if UploadLocalFile succeeds', async () => {
    const httpResponse = await sut.handle({ file })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { fileName: 'any_file_name' }
    })
  })
})
