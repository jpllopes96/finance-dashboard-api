import { Router } from 'express'
import {
    makeCreateTransactionController,
    makeGetTransactionsByUserId,
    makeUpdateTransaction,
    makeDeleteTransaction,
} from '../factories/controllers/transaction.js'
import { auth } from '../middlewares/auth.js'

export const transactionRouter = Router()

transactionRouter.get('/', auth, async (request, response) => {
    const getTransactionsByUserIdController = makeGetTransactionsByUserId()
    const { statusCode, body } =
        await getTransactionsByUserIdController.execute({
            ...request,
            query: {
                userId: request.userId,
            },
        })
    response.status(statusCode).send(body)
})

transactionRouter.post('/', auth, async (request, response) => {
    const createTransactionController = makeCreateTransactionController()
    const { statusCode, body } = await createTransactionController.execute({
        ...request,
        body: {
            ...request.body,
            user_id: request.userId,
        },
    })

    response.status(statusCode).send(body)
})

transactionRouter.patch('/:transactionId', auth, async (request, response) => {
    const updateTransactionController = makeUpdateTransaction()
    const { statusCode, body } = await updateTransactionController.execute({
        ...request,
        body: {
            ...request.body,
            user_id: request.userId,
        },
    })

    response.status(statusCode).send(body)
})

transactionRouter.delete('/:transactionId', async (request, response) => {
    const deleteTransactionController = makeDeleteTransaction()
    const { statusCode, body } =
        await deleteTransactionController.execute(request)

    response.status(statusCode).send(body)
})
