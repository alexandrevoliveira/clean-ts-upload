import { RequiredFieldError } from '@/application/errors'

export class Required {
  constructor (
    readonly value: string,
    readonly fieldName?: string
  ) {}

  validate (): Error | undefined {
    if (this.value === null) return new RequiredFieldError(this.fieldName)
  }
}
