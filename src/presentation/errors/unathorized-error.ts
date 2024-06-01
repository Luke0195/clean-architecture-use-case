export class UnauthorizedError extends Error {
  constructor(message: string) {
    super('Unauthorized Crendecials')
    this.name = 'UnauthorizedError'
  }
}
