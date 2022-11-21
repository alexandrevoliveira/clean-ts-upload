export interface HttpResponse<T = any> {
  statusCode: number
  data: T
}

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})
