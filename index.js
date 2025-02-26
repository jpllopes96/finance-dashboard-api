import 'dotenv/config.js'
import express from 'express'
import { usersRouter, transactionRouter } from './src/routes/index.js'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'

const app = express()

app.use(express.json())

app.use('/api/users', usersRouter)

app.use('/api/transactions', transactionRouter)

const swaggerDocument = JSON.parse(
    fs.readFileSync(
        path.join(import.meta.dirname, './docs/swagger.json'),
        'utf-8',
    ),
)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`),
)
