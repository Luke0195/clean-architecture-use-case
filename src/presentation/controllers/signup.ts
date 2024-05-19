import { type HttpRequest, type HttpResponse } from '../protocols/http'
export class SignUpController {
  handle(httRequest: HttpRequest): HttpResponse {
    if (!httRequest.body.name) {
      return { statusCode: 400, body: new Error('Missing Param: name') }
    }

    if (!httRequest.body.email) {
      return { statusCode: 400, body: new Error('Missing Param: email') }
    }

    return { statusCode: 201, body: {} }
  }
}
