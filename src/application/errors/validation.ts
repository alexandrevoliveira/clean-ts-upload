export class InvalidMimeTypeError extends Error {
  constructor (allowed: string[]) {
    super(`Unsupported file. Allowed extensions: ${allowed.join(', ')}`)
    this.name = 'InvalidMimeTypeError'
  }
}

export class RequiredFieldError extends Error {
  constructor (fieldName?: string) {
    const message = fieldName !== undefined
      ? `The field ${fieldName} is required`
      : 'Field required'
    super(message)
    this.name = 'RequiredFieldError'
  }
}
