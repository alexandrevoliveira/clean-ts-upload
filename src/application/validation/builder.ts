import { AllowedMimeTypes, Extension, Required, RequiredBuffer, Validator } from '@/application/validation'

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
    if (this.value instanceof Buffer) {
      this.validators.push(new RequiredBuffer(this.value, this.fieldName))
    } else {
      this.validators.push(new Required(this.value, this.fieldName))
      if (this.value.buffer !== undefined) {
        this.validators.push(new RequiredBuffer(this.value.buffer, this.fieldName))
      }
    }
    return this
  }

  file ({ allowed }: { allowed: Extension[] }): ValidationBuilder {
    if (this.value.mimeType !== undefined) {
      this.validators.push(new AllowedMimeTypes(allowed, this.value.mimeType))
    }
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
