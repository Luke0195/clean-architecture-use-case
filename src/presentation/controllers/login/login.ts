import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import {
  type HttpRequest,
  type HttpResponse,
  type Controller
} from '../../protocols'

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const item of requiredFields) {
      if (!httpRequest.body[item]) {
        return badRequest(new MissingParamError(item))
      }
    }
  }
}
