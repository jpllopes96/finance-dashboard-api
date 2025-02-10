import { UserNotFoundError } from '../../errors/users.js'
import {
    checkIfIdIsValid,
    InvalidIdResponse,
    ok,
    requiredFieldIsMissingResponse,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'

export class GetTransactionByUserIdController {
    constructor(getTransactionBtUserIdUseCase) {
        this.getTransactionBtUserIdUseCase = getTransactionBtUserIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.GetTransactionByUserIdController
            if (!userId) {
                return requiredFieldIsMissingResponse('userId')
            }

            const userIdIsValid = checkIfIdIsValid(userId)

            if (!userIdIsValid) {
                return InvalidIdResponse()
            }

            const transactions =
                await this.getTransactionBtUserIdUseCase.execute({
                    userId,
                })

            return ok(transactions)
        } catch (error) {
            console.log(error)
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }
            return serverError()
        }
    }
}
