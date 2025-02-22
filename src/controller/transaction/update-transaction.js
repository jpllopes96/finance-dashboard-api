import {
    InvalidIdResponse,
    serverError,
    checkIfIdIsValid,
    ok,
    badRequest,
} from '../helpers/index.js'
import { ZodError } from 'zod'
import { updateTransactionSchema } from '../../schemas/index.js'

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const idIsValid = checkIfIdIsValid(httpRequest.params.transactionId)

            if (!idIsValid) {
                return InvalidIdResponse()
            }

            const params = httpRequest.body
            await updateTransactionSchema.parseAsync(params)
            const updatedTransaction =
                await this.updateTransactionUseCase.execute(
                    httpRequest.params.transactionId,
                    params,
                )

            return ok(updatedTransaction)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors[0].message,
                })
            }
            console.error(error)
            return serverError()
        }
    }
}
