import {
  type Controller,
  type EmailValidator,
  type AddAccount,
  type HttpRequest,
  type HttpResponse
} from './signup-protocols'
import { badRequest, serverError, created } from '../../helpers/http-helper'
import { InvalidParamErorr, MissingParamError } from '../../errors'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]
      for (const item of requiredFields) {
        if (!httpRequest.body[item]) {
          return badRequest(new MissingParamError(`${item}`))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      const isValidEmail = this.emailValidator.isValid(email as string)
      if (password !== passwordConfirmation) {
        return badRequest(new MissingParamError('passwordConfirmation'))
      }
      if (!isValidEmail) {
        return badRequest(new InvalidParamErorr('email'))
      }
      const account = await this.addAccount.add({
        email,
        password,
        name
      })

      return created(account)
    } catch (error: any) {
      return serverError(error as Error)
    }
  }
}
