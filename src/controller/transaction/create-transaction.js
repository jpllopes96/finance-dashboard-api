import {
    serverError,
    badRequest,
    checkIfIdIsValid,
    InvalidIdResponse,
    created,
} from '../helpers/index.js'

import validator from 'validator'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            //validate the request(not null fields)
            const requiredFields = ['user_id', 'name', 'date', 'amount', 'type']

            for (const field of requiredFields) {
                if (
                    !params[field] ||
                    params[field].toString().trim().length == 0
                ) {
                    return badRequest({
                        message: `The field ${field} is required`,
                    })
                }
            }

            const userIdIsValid = checkIfIdIsValid(params.user_id)
            if (!userIdIsValid) {
                return InvalidIdResponse()
            }

            if (params.amount <= 0) {
                return badRequest({
                    message: 'The amount must be greater than 0',
                })
            }

            const amountIsVaid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                },
            )

            if (!amountIsVaid) {
                return badRequest({
                    message: 'The amount must be a valid currency: 00.00',
                })
            }

            const type = params.type.trim().toUpperCase()

            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                type,
            )

            if (!typeIsValid) {
                return badRequest({
                    message: 'The type must be EARNING, EXPENSE or INVESTMENT.',
                })
            }

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            })

            return created(transaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
