import { DeleteUserUseCase } from '../use-cases/delete-user.js'

import {
    checkIfIdIsValid,
    InvalidIdResponse,
    ok,
    serverError,
} from './helpers/index.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const idIsValid = checkIfIdIsValid(userId)

            if (!idIsValid) {
                return InvalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()
            const deletedUser = await deleteUserUseCase.execute(userId)

            return ok(deletedUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
