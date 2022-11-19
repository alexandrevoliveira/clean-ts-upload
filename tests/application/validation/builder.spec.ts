import { Required, RequiredBuffer, ValidationBuilder } from '@/application/validation'

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
})
