import { InvalidMimeTypeError } from '@/application/errors'
import { Validator } from '@/application/validation'

export type Extension = 'gz'

export class AllowedMimeTypes implements Validator {
  constructor (
    private readonly allowed: Extension[],
    private readonly mimeType: string
  ) {}

  validate (): Error | undefined {
    let isValid = false
    if (this.isGz()) isValid = true
    if (!isValid) return new InvalidMimeTypeError(this.allowed)
  }

  private isGz (): boolean {
    return this.allowed.includes('gz') && this.mimeType === 'application/gzip'
  }
}
