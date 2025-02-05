import { EmailAlreadyInUserError } from '../../errors/users.js'
import {
    checkIfEmaailIsValid,
    checkIfIdIsValid,
    checkIfPasswordIsValid,
    EmailAlreadyInUseResponse,
    InvalidIdResponse,
    InvalidPasswordResponse,
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

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed',
                })
            }

            if (params.password) {
                //check password lenght
                const passwordIsValid = checkIfPasswordIsValid(params.password)
                if (!passwordIsValid) {
                    return InvalidPasswordResponse()
                }
            }

            if (params.email) {
                //check if email is a e-mail name@domain.com
                const emailIsValid = checkIfEmaailIsValid(params.email)
                if (!emailIsValid) {
                    return EmailAlreadyInUseResponse()
                }
            }

            const updateUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )

            return ok(updateUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUserError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
