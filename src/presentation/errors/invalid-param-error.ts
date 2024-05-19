export class InvalidParamErorr extends Error {
  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}