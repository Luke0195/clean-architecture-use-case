import { type EmailValidator } from './../protocols/email-validator'
import { InvalidParamErorr, MissingParamError } from '../errors'
import { type HttpRequest, type HttpResponse } from './../protocols/http'
import { badRequest, serverError } from '../helpers/http-helper'
import { type Controller } from '../protocols/controller'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]
      for (const item of requiredFields) {
        if (!httRequest.body[item]) {
          return badRequest(new MissingParamError(`Missing Param: ${item}`))
        }
      }
      const isValidEmail = this.emailValidator.isValid(
        httRequest.body.email as string
      )
      if (!isValidEmail) {
        return badRequest(new InvalidParamErorr('email'))
      }

      return { statusCode: 201, body: {} }
    } catch (error) {
      return serverError()
    }
  }
}
