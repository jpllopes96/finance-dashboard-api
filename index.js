import 'dotenv/config.js'
import express from 'express'
import {
    CreateUserControler,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController,
} from './src/controller/index.js'
import { GetUserByIdUseCase } from './src/use-cases/get-user-by-id.js'
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js'

const app = express()

app.use(express.json())

app.get('/api/user/:userId', async (request, response) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

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

app.delete('/api/user/:userId', async (request, response) => {
    const deleteUserController = new DeleteUserController()
    const { statusCode, body } = await deleteUserController.execute(request)

    response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`),
)
