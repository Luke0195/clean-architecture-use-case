import express from 'express'
import setUpmiddlewares from './middlewares'

const app = express()
setUpmiddlewares(app)
export default app
