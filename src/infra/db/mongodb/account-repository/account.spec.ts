/*
import { MongoHelper } from '../helpers/mongo-helper'

describe('Account MongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.client.connect()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Should return an account on sucess', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      name: 'valid_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('valid_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
})
*/
