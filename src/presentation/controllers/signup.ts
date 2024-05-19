import { type HttpRequest, type HttpResponse } from './../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
  handle(httRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const item of requiredFields) {
      if (!httRequest.body[item]) {
        return badRequest(new MissingParamError(`Missing Param: ${item}`))
      }
    }

    return { statusCode: 201, body: {} }
  }
}
