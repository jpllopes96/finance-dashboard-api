import { Router } from 'express'
import {
    makeUpdateUserController,
    makeCreateUserController,
    makeGetUserController,
    makeDeleteUserController,
    makeGetUserBalanceController,
    makeLoginUserController,
} from '../factories/controllers/user.js'
import { auth } from '../middlewares/auth.js'

export const usersRouter = Router()

usersRouter.get('/', auth, async (request, response) => {
    const getUserByIdController = makeGetUserController()
    const { statusCode, body } = await getUserByIdController.execute({
        ...request,
        params: {
            userId: request.userId,
        },
    })

    response.status(statusCode).send(body)
})

usersRouter.get('/balance', auth, async (request, response) => {
    const getUseBalanceController = makeGetUserBalanceController()
    const { statusCode, body } = await getUseBalanceController.execute({
        ...request,
        params: {
            userId: request.userId,
        },
    })

    response.status(statusCode).send(body)
})

usersRouter.post('/', async (request, response) => {
    const createUserControler = makeCreateUserController()
    const { statusCode, body } = await createUserControler.execute(request)

    response.status(statusCode).send(body)
})

usersRouter.patch('/', auth, async (request, response) => {
    const updateUserController = makeUpdateUserController()
    const { statusCode, body } = await updateUserController.execute({
        ...request,
        params: {
            userId: request.userId,
        },
    })
    response.status(statusCode).send(body)
})

usersRouter.delete('/', auth, async (request, response) => {
    const deleteUserController = makeDeleteUserController()
    const { statusCode, body } = await deleteUserController.execute({
        ...request,
        params: {
            userId: request.userId,
        },
    })

    response.status(statusCode).send(body)
})

usersRouter.post('/login', async (request, response) => {
    const loginUserController = makeLoginUserController()
    const { statusCode, body } = await loginUserController.execute(request)

    response.status(statusCode).send(body)
})
