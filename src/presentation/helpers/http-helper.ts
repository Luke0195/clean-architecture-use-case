import { ServerError } from '../errors/server-error'
import { type HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const created = (body: any): HttpResponse => ({
  statusCode: 201,
  body
})

export const ok = (body?: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const unathorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: error
})
