import {
  type Encrypter,
  type AddAccountModel,
  type AccountModel,
  type AddAccountRepository
} from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'validmail@mail.com',
  password: 'hashed_password'
})

const makeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'validmail@mail.com',
  password: 'validpassword'
})
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

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = makeFakeAccount()
      return await new Promise((resolve) => {
        resolve(fakeAccount)
      })
    }
  }

  return new AddAccountRepositoryStub()
}

interface SutTypes {
  encrypterStub: Encrypter
  sut: DbAddAccount
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return { encrypterStub, sut, addAccountRepositoryStub }
}

describe('DbAddAccount UseCase', () => {
  test('Should DbAddAccount calls Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = makeAccountData()
    await sut.add(accountData)
    expect(encrypterSpy).toHaveBeenCalledWith('validpassword')
  })

  test('Should DbAddAccount throws if encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const accountData = makeAccountData()
    const rejectPromise = sut.add(accountData)
    await expect(rejectPromise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values ', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'any_name',
      email: 'validmail@mail.com',
      password: 'validpassword'
    }
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'validmail@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throws if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const accountData = {
      name: 'any_name',
      email: 'validmail@mail.com',
      password: 'validpassword'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should returns an account on success', async () => {
    const { sut } = makeSut()
    const accountData = {
      name: 'valid_name',
      email: 'validmail@mail.com',
      password: 'validpassword'
    }
    const account = await sut.add(accountData)
    expect(account).toEqual(makeFakeAccount())
  })
})
