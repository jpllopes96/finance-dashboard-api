import {
    InvalidIdResponse,
    serverError,
    checkIfIdIsValid,
    badRequest,
    checkIfAmountIsValid,
    invalidAmountResponse,
    checkIfTypeIsValid,
    invalidTypeResponse,
    ok,
} from '../helpers/index.js'

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
            const allowedFields = ['name', 'date', 'amount', 'type']

            const someFieldsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed',
                })
            }

            if (params.amount) {
                const amountIsValid = checkIfAmountIsValid(params.amount)

                if (!amountIsValid) {
                    return invalidAmountResponse()
                }
            }

            if (params.type) {
                const typeIsValid = checkIfTypeIsValid(params.type)

                if (!typeIsValid) {
                    return invalidTypeResponse()
                }
            }

            const updatedTransaction =
                await this.updateTransactionUseCase.execute(
                    httpRequest.params.transactionId,
                    params,
                )

            return ok(updatedTransaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
