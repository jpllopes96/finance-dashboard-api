import { badRequest, ok } from './helpers.js'
import validator from 'validator'
import { EmailAlreadyInUserError } from '../errors/users.js'
import { serverError } from './helpers.js'
import { UpdateUserUseCase } from '../use-cases/update-user.js'
export class UpdateUserControler {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const isIdValid = validator.isUUID(userId)

            if (!isIdValid) {
                return badRequest({
                    message: 'The provided id is not a UUID',
                })
            }

            const updateUserParam = httpRequest.body

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldsNotAllowed = Object.keys(updateUserParam).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed',
                })
            }

            if (updateUserParam.password) {
                //check password lenght
                if (updateUserParam.password.length < 6) {
                    return badRequest({
                        message: `Password must be at least 6 characters`,
                    })
                }
            }

            if (updateUserParam.email) {
                //check if email is a e-mail name@domain.com
                const emailIsValid = validator.isEmail(updateUserParam.email)
                if (!emailIsValid) {
                    return badRequest({
                        message: `Invalid e-mail. Please provide a valid one.`,
                    })
                }
            }

            const updateUserUseCase = new UpdateUserUseCase()

            const updateUser = await updateUserUseCase.execute(
                userId,
                updateUserParam,
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
