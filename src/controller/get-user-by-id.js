import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import {
    checkIfIdIsValid,
    InvalidIdResponse,
    userNotFoundResponse,
    ok,
    serverError,
} from './helpers/index.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.userId)
            if (!isIdValid) {
                return InvalidIdResponse()
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()
            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return userNotFoundResponse()
            }
            return ok(user)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
