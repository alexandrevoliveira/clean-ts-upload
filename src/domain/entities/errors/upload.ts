export class UploadError extends Error {
  constructor (value?: string) {
    const message = value !== undefined
      ? `Some error occurred during the upload of ${value} file`
      : 'Some error occurred during the upload'
    super(message)
    this.name = 'UploadError'
  }
}
