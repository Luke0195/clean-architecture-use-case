import {
  type EmailValidator,
  type Controller,
  type HttpRequest,
  type HttpResponse
} from './../protocols/'
import { InvalidParamErorr, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { type AddAccount } from '../../domain/usecases/add-account'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]
      for (const item of requiredFields) {
        if (!httpRequest.body[item]) {
          return badRequest(new MissingParamError(`Missing Param: ${item}`))
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
      const account = this.addAccount.add({
        email,
        password,
        name
      })
      console.log(account)
      return { statusCode: 201, body: {} }
    } catch (error) {
      return serverError()
    }
  }
}
