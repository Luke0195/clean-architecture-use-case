import { DbAddAccount } from './db-add-account'
import { type Encrypter } from '../../protocols/encrypter'

interface SutTypes {
  encrypterStub: Encrypter
  sut: DbAddAccount
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(password: string): Promise<string> {
      return await new Promise((resolve) => {
        resolve('hashed_password')
      })
    }
  }
  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)
  return { sut, encrypterStub }
}

describe('DbAddAccount UseCase', () => {
  test('Should DbAddAccount calls Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'validmail@mail.com',
      password: 'validpassword'
    }
    await sut.add(accountData)
    expect(encrypterSpy).toHaveBeenCalledWith('validpassword')
  })
})
