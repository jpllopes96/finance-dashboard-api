import 'dotenv/config.js'
import express from 'express'
import {
    CreateUserControler,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController,
} from './src/controller/index.js'
import { GetUserByIdUseCase } from './src/use-cases/get-user-by-id.js'
import { DeleteUserUseCase } from './src/use-cases/delete-user.js'
import { UpdateUserUseCase } from './src/use-cases/update-user.js'
import { CreateUserUseCase } from './src/use-cases/create-user.js'
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js'
import { PostgresDeleteUserRepository } from './src/repositories/postgres/delete-user.js'
import { PostgresUpdateUserRepository } from './src/repositories/postgres/update-user.js'
import { PostgresCreateUserRepository } from './src/repositories/postgres/create-user.js'
import { PostgresGetUserByEmailRepository } from './src/repositories/postgres/get-user-by-email.js'

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
    const getUserByEmailRepostiory = new PostgresGetUserByEmailRepository()
    const createUserRepository = new PostgresCreateUserRepository()
    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepostiory,
        createUserRepository,
    )

    const createUserControler = new CreateUserControler(createUserUseCase)

    const { statusCode, body } = await createUserControler.execute(request)

    response.status(statusCode).send(body)
})

app.patch('/api/user/:userId', async (request, response) => {
    const getUserByEmailRepostiory = new PostgresGetUserByEmailRepository()
    const updetaUserRepository = new PostgresUpdateUserRepository()

    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEmailRepostiory,
        updetaUserRepository,
    )

    const updateUserController = new UpdateUserController(updateUserUseCase)
    const { statusCode, body } = await updateUserController.execute(request)
    response.status(statusCode).send(body)
})

app.delete('/api/user/:userId', async (request, response) => {
    const deleteUserRepository = new PostgresDeleteUserRepository()

    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)

    const deleteUserControler = new DeleteUserController(deleteUserUseCase)

    const { statusCode, body } = await deleteUserControler.execute(request)

    response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`),
)
