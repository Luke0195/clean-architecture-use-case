import express from 'express'
import setUpmiddlewares from './middlewares'
import setupRoutes from './routes'

const app = express()
setUpmiddlewares(app)
setupRoutes(app)
export default app
