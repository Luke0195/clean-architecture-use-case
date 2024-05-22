import { type EmailValidator } from '../presentation/protocols/email-validator'
import { isEmail } from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return isEmail(email)
  }
}
