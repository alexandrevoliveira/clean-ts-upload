import { UploadError } from '@/domain/entities/errors'
import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { setupUploadLocalFile, UploadLocalFile } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UploadLocalFile', () => {
  let buffer: Buffer
  let mimeType: string
  let fileName: string
  let file: { buffer: Buffer, mimeType: string, fileName: string }
  let uuid: string
  let crypto: MockProxy<UUIDGenerator>
  let fileStorage: MockProxy<UploadFile>
  let sut: UploadLocalFile

  beforeAll(() => {
    buffer = Buffer.from('any_buffer')
    mimeType = 'application/gzip'
    fileName = 'any_file_name'
    file = { buffer, mimeType, fileName }
    uuid = 'any_unique_id'
    crypto = mock()
    crypto.uuid.mockReturnValue(uuid)
    fileStorage = mock()
    fileStorage.upload.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = setupUploadLocalFile(fileStorage, crypto)
  })

  it('should call UUIDGenerator with correct input', async () => {
    await sut({ file: { buffer, mimeType, fileName } })

    expect(crypto.uuid).toHaveBeenCalledWith({ key: file.fileName })
  })

  it('should rethrow if UUIDGenerator throws', async () => {
    crypto.uuid.mockImplementationOnce(() => { throw new Error('uuid_error') })

    const promise = sut({ file: { buffer, mimeType, fileName } })

    await expect(promise).rejects.toThrow()
  })

  it('should call UploadFile with correct input', async () => {
    await sut({ file: { buffer, mimeType, fileName } })

    expect(fileStorage.upload).toHaveBeenCalledWith({ file: buffer, fileName: uuid })
  })

  it('should rethrow UploadError when UploadFile returns any Error', async () => {
    fileStorage.upload.mockResolvedValueOnce(new Error('any_upload_error'))

    const promise = sut({ file: { buffer, mimeType, fileName } })

    await expect(promise).rejects.toThrow(new UploadError())
  })

  it('should return correct data when UploadFile returns undefined', async () => {
    const result = await sut({ file: { buffer, mimeType, fileName } })

    expect(result).toEqual({ fileName: uuid })
  })
})
