import { ServerError } from '../errors/server-error'
import { type HttpResponse } from '../protocols/http'

class HttpHelper {
  badRequest(error: Error): HttpResponse {
    return { statusCode: 400, body: error }
  }

  serverError(error: Error): HttpResponse {
    return { statusCode: 500, body: new ServerError(error.stack) }
  }

  created(body: any): HttpResponse {
    return { statusCode: 201, body }
  }

  ok(body?: any): HttpResponse {
    return { statusCode: 200, body }
  }

  unathorized(error: Error): HttpResponse {
    return { statusCode: 401, body: error }
  }
}

export default new HttpHelper()
