import { InvalidParamErorr, MissingParamError } from '../../errors'
import { badRequest, serverError, unathorized } from '../../helpers/http-helper'
import {
  type HttpRequest,
  type HttpResponse,
  type Controller
} from '../../protocols'
import { type EmailValidator } from '../signup/signup-protocols'
import { type Authentication } from '../../../domain/usecases/authentication'
import { UnauthorizedError } from '../../errors/unathorized-error'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const item of requiredFields) {
        if (!httpRequest.body[item]) {
          return badRequest(new MissingParamError(item))
        }
      }
      const { email, password } = httpRequest.body
      const isValidEmail = this.emailValidator.isValid(email as string)
      if (!isValidEmail) return badRequest(new InvalidParamErorr('email'))
      const token = await this.authentication.auth(
        email as string,
        password as string
      )
      if (!token) {
        return unathorized(new UnauthorizedError('Invalid Crendencials'))
      }
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
