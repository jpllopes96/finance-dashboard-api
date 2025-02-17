import { ZodError } from 'zod'
import { EmailAlreadyInUserError } from '../../errors/users.js'
import { updateUserSchema } from '../../schemas/index.js'
import {
    checkIfIdIsValid,
    InvalidIdResponse,
    serverError,
    badRequest,
    ok,
} from '../helpers/index.js'
export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return InvalidIdResponse()
            }

            const params = httpRequest.body

            await updateUserSchema.parseAsync(params)

            const updateUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )

            return ok(updateUser)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors[0].message,
                })
            }
            if (error instanceof EmailAlreadyInUserError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
