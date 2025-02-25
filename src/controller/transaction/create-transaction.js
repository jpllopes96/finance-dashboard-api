import {
    serverError,
    created,
    badRequest,
    userNotFoundResponse,
} from '../helpers/index.js'
import { createTransactionSchema } from '../../schemas/transaction.js'
import { ZodError } from 'zod'
import { UserNotFoundError } from '../../errors/users.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            if (typeof params.type === 'string') {
                params.type = params.type.toUpperCase()
            }
            await createTransactionSchema.parseAsync(params)

            const transaction =
                await this.createTransactionUseCase.execute(params)

            return created(transaction)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors[0].message,
                })
            }
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }
            console.error(error)
            return serverError()
        }
    }
}
