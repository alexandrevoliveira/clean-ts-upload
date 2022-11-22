import { ServerError } from '@/application/errors'
import { adaptMulter } from '@/main/adapters'

import { NextFunction, Request, RequestHandler, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import multer from 'multer'

jest.mock('multer')

describe('adaptMulter', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let fakeMulter: jest.Mocked<typeof multer>
  let multerSpy: jest.Mock
  let singleSpy: jest.Mock
  let uploadSpy: jest.Mock
  let sut: RequestHandler

  beforeAll(() => {
    req = getMockReq()
    res = getMockRes().res
    next = getMockRes().next
    fakeMulter = multer as jest.Mocked<typeof multer>
    uploadSpy = jest.fn().mockImplementation((req, res, next) => {
      next()
    })
    singleSpy = jest.fn().mockImplementation(() => uploadSpy)
    multerSpy = jest.fn().mockImplementation(() => ({ single: singleSpy }))
    jest.mocked(fakeMulter).mockImplementation(multerSpy)
  })

  beforeEach(() => {
    sut = adaptMulter
  })

  it('should call single upload with correct input', async () => {
    sut(req, res, next)

    expect(multerSpy).toHaveBeenCalledTimes(1)
    expect(multerSpy).toHaveBeenCalledWith()
    expect(singleSpy).toHaveBeenCalledTimes(1)
    expect(singleSpy).toHaveBeenCalledWith('file')
    expect(uploadSpy).toHaveBeenCalledTimes(1)
    expect(uploadSpy).toHaveBeenCalledWith(req, res, expect.any(Function))
  })

  it('should return 500 if upload fails', async () => {
    const error = new Error('multer_error')
    uploadSpy.mockImplementationOnce((req, res, next) => {
      next(error)
    })

    sut(req, res, next)

    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: new ServerError(error).message })
  })
})
