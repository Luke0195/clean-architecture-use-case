import {
  type HttpRequest,
  type Controller
} from '../../../presentation/protocols'
import { type Request, type Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body
    }
    const httpResponse = await controller.handle(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
