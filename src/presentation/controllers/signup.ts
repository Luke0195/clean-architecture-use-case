import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
  handle(httRequest: HttpRequest): HttpResponse {
    if (!httRequest.body.name) {
      return badRequest(new MissingParamError('Missing Param: name'))
    }

    if (!httRequest.body.email) {
      return badRequest(new MissingParamError('Missing Param: email'))
    }

    return { statusCode: 201, body: {} }
  }
}
