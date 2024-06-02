import {
  type Controller,
  type EmailValidator,
  type AddAccount,
  type HttpRequest,
  type HttpResponse,
  httpHelper,
  type Validation
} from './signup-protocols'

import { InvalidParamErorr, MissingParamError } from '../../errors'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor(
    emailValidator: EmailValidator,
    addAccount: AddAccount,
    validation: Validation
  ) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validatioFields = this.validation.validate(httpRequest.body)
      if (validatioFields) {
        return httpHelper.badRequest(validatioFields)
      }

      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]
      for (const item of requiredFields) {
        if (!httpRequest.body[item]) {
          return httpHelper.badRequest(new MissingParamError(`${item}`))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      const isValidEmail = this.emailValidator.isValid(email as string)
      if (password !== passwordConfirmation) {
        return httpHelper.badRequest(
          new MissingParamError('passwordConfirmation')
        )
      }
      if (!isValidEmail) {
        return httpHelper.badRequest(new InvalidParamErorr('email'))
      }
      const account = await this.addAccount.add({
        email,
        password,
        name
      })

      return httpHelper.created(account)
    } catch (error: any) {
      return httpHelper.serverError(error as Error)
    }
  }
}
