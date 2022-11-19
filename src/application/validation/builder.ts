import { Required, Validator } from '@/application/validation'

export class ValidationBuilder {
  constructor (
    private readonly value: any,
    private readonly fieldName?: string,
    private readonly validators: Validator[] = []
  ) {}

  static of ({ value, fieldName }: { value: any, fieldName?: string }): ValidationBuilder {
    return new ValidationBuilder(value, fieldName)
  }

  required (): ValidationBuilder {
    this.validators.push(new Required(this.value, this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}