import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { ValidationComposite } from '@/application/validation'

jest.mock('@/application/validation/composite')

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 400,
    data: 'any_data'
  }

  async perform (httpRequest: any): Promise<HttpResponse> {
    return this.result
  }
}

describe('Controller', () => {
  let sut: ControllerStub

  beforeEach(() => {
    sut = new ControllerStub()
  })

  it('should return 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    jest.mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)

    const httpResponse = await sut.handle('any_value')

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })
})
