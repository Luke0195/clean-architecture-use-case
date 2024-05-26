import app from '../config/app'
import request from 'supertest'

describe('SignUp Routes', () => {
  test('Should returns on account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'lucas',
        email: 'lucas@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      })
      .expect(200)
  })
})
