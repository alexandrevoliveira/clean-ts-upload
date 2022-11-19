import { InvalidMimeTypeError } from '@/application/errors'
import { AllowedMimeTypes } from '@/application/validation'

describe('AllowedMimeTypes', () => {
  it('should return InvalidMimeTypeError if value is invalid', () => {
    const sut = new AllowedMimeTypes(['gz'], 'image/png')

    const error = sut.validate()

    expect(error).toEqual(new InvalidMimeTypeError(['gz']))
  })

  it('should return undefined if value is valid', () => {
    const sut = new AllowedMimeTypes(['gz'], 'application/gzip')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
