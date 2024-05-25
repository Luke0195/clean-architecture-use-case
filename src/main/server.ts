import express from 'express'

const app = express()

app.get('/', (request, response) => {
  return response.status(200).json({ message: 'Clean Node API' })
})

app.listen(5050, () => {
  console.log('Server at http://localhost:5050')
})
