import { InvalidParamErorr, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import {
  type HttpRequest,
  type HttpResponse,
  type Controller
} from '../../protocols'
import { type EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const item of requiredFields) {
        if (!httpRequest.body[item]) {
          return badRequest(new MissingParamError(item))
        }
      }
      const { email } = httpRequest.body
      const isValidEmail = this.emailValidator.isValid(email as string)
      if (!isValidEmail) return badRequest(new InvalidParamErorr('email'))
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
