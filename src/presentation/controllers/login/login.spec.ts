import { InvalidParamErorr, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import {
  type HttpRequest,
  type EmailValidator
} from '../signup/signup-protocols'
import { LoginController } from './login'

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'anymail@mail.com',
    password: 'any_password'
  }
})
const makeEmailValidator = (): EmailValidator => {
  class EmailValitorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValitorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new LoginController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('LoginController', () => {
  test('Should returns 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should returns 400 if no  password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const httpRequest = makeFakeRequest()
    const emailValidatorSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.handle(httpRequest)
    expect(emailValidatorSpy).toHaveBeenCalledWith('anymail@mail.com')
  })

  test('Should  return false is invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const httpRequest = makeFakeRequest()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRespose = await sut.handle(httpRequest)
    expect(httpRespose).toEqual(badRequest(new InvalidParamErorr('email')))
  })
})
