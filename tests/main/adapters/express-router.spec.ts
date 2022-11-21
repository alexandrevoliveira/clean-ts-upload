import { Controller } from '@/application/controllers'
import { adaptExpressRoute } from '@/main/adapters'

import { NextFunction, Request, RequestHandler, Response } from 'express'
import { mock, MockProxy } from 'jest-mock-extended'
import { getMockReq, getMockRes } from '@jest-mock/express'

describe('adaptExpressRoute', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let controller: MockProxy<Controller>
  let sut: RequestHandler

  beforeAll(() => {
    req = getMockReq({ body: { anyBody: 'any_body' }, locals: { anyLocals: 'any_locals' } })
    res = getMockRes().res
    next = getMockRes().next
    controller = mock()
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: { data: 'any_data' }
    })
  })

  beforeEach(() => {
    sut = adaptExpressRoute(controller)
  })

  it('should call handle with correct request', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledTimes(1)
    expect(controller.handle).toHaveBeenCalledWith({ anyBody: 'any_body', anyLocals: 'any_locals' })
  })

  it('should call handle with empty request', async () => {
    req = getMockReq()

    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledTimes(1)
    expect(controller.handle).toHaveBeenCalledWith({})
  })

  it('should return 200 and correct data', async () => {
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ data: 'any_data' })
  })

  it('should return 400 and correct error', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 400,
      data: new Error('any_bad_request_error')
    })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_bad_request_error' })
  })

  it('should return 500 and correct error', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 500,
      data: new Error('any_server_error')
    })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_server_error' })
  })
})
