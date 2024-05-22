import { EmailValidatorAdapter } from './email-validator'
describe('EmailValidatorAdapter', () => {
  test('Should returns false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValidEmail = sut.isValid('invalid_mail@mail.com')
    expect(isValidEmail).toBe(false)
  })
})
