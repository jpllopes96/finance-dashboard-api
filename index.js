import 'dotenv/config.js'
import express from 'express'
import { CreateUserControler } from './src/controller/create-user.js'
import { GetUserByIdController } from './src/controller/get-user-by-id.js'

const app = express()

app.use(express.json())

app.post('/api/users', async (request, response) => {
    const createUserControler = new CreateUserControler()

    const { statusCode, body } = await createUserControler.execute(request)

    response.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = new GetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`),
)
