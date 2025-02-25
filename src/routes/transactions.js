import { Router } from 'express'
import {
    makeCreateTransactionController,
    makeGetTransactionsByUserId,
    makeUpdateTransaction,
    makeDeleteTransaction,
} from '../factories/controllers/transaction.js'

export const transactionRouter = Router()

transactionRouter.get('/', async (request, response) => {
    const getTransactionsByUserIdController = makeGetTransactionsByUserId()
    const { statusCode, body } =
        await getTransactionsByUserIdController.execute(request)
    response.status(statusCode).send(body)
})

transactionRouter.post('/', async (request, response) => {
    const createTransactionController = makeCreateTransactionController()
    const { statusCode, body } =
        await createTransactionController.execute(request)

    response.status(statusCode).send(body)
})

transactionRouter.patch('/:transactionId', async (request, response) => {
    const updateTransactionController = makeUpdateTransaction()
    const { statusCode, body } =
        await updateTransactionController.execute(request)

    response.status(statusCode).send(body)
})

transactionRouter.delete('/:transactionId', async (request, response) => {
    const deleteTransactionController = makeDeleteTransaction()
    const { statusCode, body } =
        await deleteTransactionController.execute(request)

    response.status(statusCode).send(body)
})
