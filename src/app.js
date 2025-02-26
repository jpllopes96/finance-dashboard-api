import express from 'express'
import { usersRouter, transactionRouter } from './routes/index.js'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const app = express()

app.use(express.json())

app.use('/api/users', usersRouter)

app.use('/api/transactions', transactionRouter)

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../docs/swagger.json'), 'utf-8'),
)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
