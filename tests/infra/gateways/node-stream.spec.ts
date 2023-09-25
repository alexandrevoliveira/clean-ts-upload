import { NodeStream, ReadStream } from '@/infra/gateways'

import { createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'

jest.mock('fs')
jest.mock('stream')
jest.mock('util')

describe('Streams', () => {
  describe('NodeStream', () => {
    let itemPath: string
    let file: Buffer
    let pipelineAsyncSpy: jest.Mock
    let promisifySpy: jest.Mock
    let createWriteStreamSpy: jest.Mock
    let sut: NodeStream

    beforeAll(async () => {
      file = Buffer.from('any_file_content')
      itemPath = 'tmp/any_file.csv'
      pipelineAsyncSpy = jest.fn()
      promisifySpy = jest.fn().mockImplementation(() => pipelineAsyncSpy)
      jest.mocked(promisify).mockImplementation(promisifySpy)
      createWriteStreamSpy = jest.fn()
      jest.mocked(createWriteStream).mockImplementation(createWriteStreamSpy)
    })

    beforeEach(() => {
      sut = new NodeStream()
    })

    it('should write stream on right path', async () => {
      const readStreamSpy = jest.fn()
      jest.spyOn(ReadStream, 'Readable').mockImplementationOnce(readStreamSpy)

      await sut.writeOn({ item: file, itemPath })

      expect(promisifySpy).toHaveBeenCalledWith(pipeline)
      expect(readStreamSpy).toHaveBeenCalled()
      expect(createWriteStreamSpy).toHaveBeenCalledWith(itemPath)
      expect(pipelineAsyncSpy).toHaveBeenCalled()
    })
  })

  describe('ReadStream', () => {
    it('should have undefined options if file is instanceof Buffer or typeof string', async () => {
      const file = Buffer.from('any_file_content')

      const sut = ReadStream.execute({ item: file })

      expect(sut.readStreamOptions).toBeUndefined()
    })

    it('should have options with objectMode equal to true if file is neither instanceof Buffer nor typeof string', async () => {
      const file = { anything: 'any_object' }

      const sut = ReadStream.execute({ item: file })

      expect(sut.readStreamOptions).toEqual({ objectMode: true })
    })
  })
})
