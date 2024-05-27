import { LogControllerDecorator } from './log'
import {
  type HttpRequest,
  type HttpResponse,
  type Controller
} from '../../presentation/protocols'

describe('LogController Decorator', () => {
  test('should call handle correctly', async () => {
    class ControllerStub implements Controller {
      async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse = {
          statusCode: 200,
          body: {
            name: 'Lucas'
          }
        }
        return await new Promise((resolve) => {
          resolve(httpResponse)
        })
      }
    }
    const controllerSub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerSub, 'handle')
    const sut = new LogControllerDecorator(controllerSub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
