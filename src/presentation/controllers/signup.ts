export class SignUpController {
  handle(httRequest: any): any {
    if (!httRequest.body.name) {
      return { statusCode: 400, body: new Error('Missing Param:name') }
    }

    return {}
  }
}
