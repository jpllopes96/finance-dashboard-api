import 'dotenv/config.js'
import express from 'express'
import {
    CreateUserControler,
    GetUserByIdController,
    UpdateUserController,
} from './src/controller/index.js'

const app = express()

app.use(express.json())

app.post('/api/users', async (request, response) => {
    const createUserControler = new CreateUserControler()

    const { statusCode, body } = await createUserControler.execute(request)

    response.status(statusCode).send(body)
})

app.patch('/api/user/:userId', async (request, response) => {
    const updateUserController = new UpdateUserController()
    const { statusCode, body } = await updateUserController.execute(request)
    response.status(statusCode).send(body)
})

app.get('/api/user/:userId', async (request, response) => {
    const getUserByIdController = new GetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`),
)
