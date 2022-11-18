export class UploadError extends Error {
  constructor () {
    super('Upload failed')
    this.name = 'UploadError'
  }
}
