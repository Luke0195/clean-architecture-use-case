import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await new Promise((resolve) => {
      resolve('hashed_value')
    })
  }
}))

describe('BcryptAdapter', () => {
  test('Should call EncrypterAdapter with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })

  test('Should return a hashedpassword on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashedPassword = await sut.encrypt('any_value')
    expect(hashedPassword).toEqual('hashed_value')
  })
})
