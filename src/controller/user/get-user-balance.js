import {
    checkIfIdIsValid,
    InvalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'
import { UserNotFoundError } from '../../errors/users.js'

export class GetUserByIdController {
    constructor(getUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = checkIfIdIsValid(httpRequest.param.userId)
            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return InvalidIdResponse()
            }

            const balance = await this.getUserBalanceUseCase.execute({ userId })

            return ok(balance)
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse
            }
            console.error(error)
            return serverError()
        }
    }
}
