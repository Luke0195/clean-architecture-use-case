import {
  MissingParamError,
  InvalidParamErorr,
  UnauthorizedError,
  type Controller,
  type EmailValidator,
  type Authentication,
  type HttpRequest,
  type HttpResponse,
  badRequest,
  unathorized,
  serverError,
  ok
} from './login-protocols'

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
      return ok(token)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
