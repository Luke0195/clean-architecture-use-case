import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', (request, response) =>
    response.json({ message: 'teste' })
  )
}
