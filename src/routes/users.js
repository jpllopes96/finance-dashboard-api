import { Router } from 'express'
import {
    makeUpdateUserController,
    makeCreateUserController,
    makeGetUserController,
    makeDeleteUserController,
    makeGetUserBalanceController,
} from '../factories/controllers/user.js'

export const usersRouter = Router()

usersRouter.get('/:userId', async (request, response) => {
    const getUserByIdController = makeGetUserController()
    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

usersRouter.get('/:userId/balance', async (request, response) => {
    const getUseBalanceController = makeGetUserBalanceController()
    const { statusCode, body } = await getUseBalanceController.execute(request)

    response.status(statusCode).send(body)
})

usersRouter.post('/', async (request, response) => {
    const createUserControler = makeCreateUserController()
    const { statusCode, body } = await createUserControler.execute(request)

    response.status(statusCode).send(body)
})

usersRouter.patch('/:userId', async (request, response) => {
    const updateUserController = makeUpdateUserController()
    const { statusCode, body } = await updateUserController.execute(request)
    response.status(statusCode).send(body)
})

usersRouter.delete('/:userId', async (request, response) => {
    const deleteUserControler = makeDeleteUserController()
    const { statusCode, body } = await deleteUserControler.execute(request)

    response.status(statusCode).send(body)
})
