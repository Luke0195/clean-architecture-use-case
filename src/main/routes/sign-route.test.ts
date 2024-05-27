import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import request from 'supertest'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should returns on account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'lucas',
        email: 'lucas@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      })
      .expect(201)
  })
})
