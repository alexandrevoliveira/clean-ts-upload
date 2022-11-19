import { RequiredFieldError } from '@/application/errors'
import { Validator } from '@/application/validation'

export class Required implements Validator {
  constructor (
    readonly value: string,
    readonly fieldName?: string
  ) {}

  validate (): Error | undefined {
    if (this.value === null || this.value === undefined) return new RequiredFieldError(this.fieldName)
  }
}
