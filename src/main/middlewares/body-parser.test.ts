import request from 'supertest'
import app from '../config/app'

describe('BodyParser Middleware', () => {
  test('', async () => {
    app.post('/test_body_parser', (request, response) => {
      response.send(request.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Lucas' })
      .expect({ name: 'Lucas' })
  })
})
