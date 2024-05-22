import { DbAddAccount } from './db-add-account'
describe('DbAddAccount UseCase', () => {
  test('Should DbAddAccount calls Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt(password: string): Promise<string> {
        return await new Promise((resolve) => {
          resolve('hashed_password')
        })
      }
    }

    const encryptStub = new EncrypterStub()
    const sut = new DbAddAccount(encryptStub)
    const encrypterSpy = jest.spyOn(encryptStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'validmail@mail.com',
      password: 'validpassword'
    }
    await sut.add(accountData)
    expect(encrypterSpy).toHaveBeenCalledWith('validpassword')
  })
})
