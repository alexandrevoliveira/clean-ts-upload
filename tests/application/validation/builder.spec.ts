import { AllowedMimeTypes, Required, RequiredBuffer, ValidationBuilder } from '@/application/validation'

describe('ValidationBuilder', () => {
  it('should return Required', () => {
    const validators = ValidationBuilder.of({ value: 'any_value' }).required().build()

    expect(validators).toEqual([new Required('any_value')])
  })

  it('should return RequiredBuffer', () => {
    const buffer = Buffer.from('any_buffer')

    const validators = ValidationBuilder.of({ value: buffer }).required().build()

    expect(validators).toEqual([new RequiredBuffer(buffer)])
  })

  it('should return Required and RequiredBuffer', () => {
    const buffer = Buffer.from('any_buffer')

    const validators = ValidationBuilder.of({ value: { buffer }, fieldName: 'any_field' }).required().build()

    expect(validators).toEqual([new Required({ buffer }, 'any_field'), new RequiredBuffer(buffer, 'any_field')])
  })

  it('should return AllowedMimeTypes', () => {
    const validators = ValidationBuilder
      .of({ value: { mimeType: 'application/gzip' } })
      .file({ allowed: ['gz'] })
      .build()

    expect(validators).toEqual([new AllowedMimeTypes(['gz'], 'application/gzip')])
  })
})
