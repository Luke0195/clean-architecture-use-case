import { LogControllerDecorator } from './log'
import {
  type HttpRequest,
  type HttpResponse,
  type Controller
} from '../../presentation/protocols'
import { type AccountModel } from '../../domain/models/account'
import { ok } from '../../presentation/helpers/http-helper'
import { type LogErrorRepository } from '../../data/protocols/log-error-protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})
const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_mail@mail.com',
  password: 'valid_password'
})

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: makeFakeAccount()
      }
      return await new Promise((resolve) => {
        resolve(httpResponse)
      })
    }
  }
  return new ControllerStub()
}

const makeLogRepository = (): LogErrorRepository => {
  class LogErrorStub implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
      console.log(stack)
    }
  }
  return new LogErrorStub()
}

interface SutTypes {
  controllerStub: Controller
  sut: LogControllerDecorator
}
const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorStub = makeLogRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorStub)
  return {
    controllerStub,
    sut
  }
}
describe('LogController Decorator', () => {
  test('should call handle correctly', async () => {
    const { controllerStub, sut } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })
})
