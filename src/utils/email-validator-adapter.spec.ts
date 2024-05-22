import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidatorAdapter', () => {
  test('Should returns false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValidEmail = sut.isValid('invalid_mail@mail.com')
    expect(isValidEmail).toBe(false)
  })

  test('Should returns false if validator returns false', () => {
    const sut = makeSut()
    const isValidEmail = sut.isValid('valid@mail.com')
    expect(isValidEmail).toBe(true)
  })

  test('Should call validator with correct e-mail', () => {
    const sut = makeSut()
    const isValidEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('valid_mail@mail.com')
    expect(isValidEmailSpy).toHaveBeenCalledWith('valid_mail@mail.com')
  })
})
