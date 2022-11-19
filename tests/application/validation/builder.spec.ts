import { Required, ValidationBuilder } from '@/application/validation'

describe('ValidationBuilder', () => {
  it('should return Required', () => {
    const validators = ValidationBuilder.of({ value: 'any_value' }).required().build()

    expect(validators).toEqual([new Required('any_value')])
  })
})
