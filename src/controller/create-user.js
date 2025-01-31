import { CreateUserUseCase } from '../use-cases/create-user.js'
import { badRequest, created, serverError } from './helpers/http.js'
import { EmailAlreadyInUserError } from '../errors/users.js'
import {
    checkIfEmaailIsValid,
    checkIfPasswordIsValid,
    EmailAlreadyInUseResponse,
    InvalidPasswordResponse,
} from './helpers/user.js'

export class CreateUserControler {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            //validate the request(not null fields)
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length == 0) {
                    return badRequest({
                        message: `The field ${field} is required`,
                    })
                }
            }

            //check password lenght
            const passwordIsValid = checkIfPasswordIsValid(params.password)
            if (!passwordIsValid) {
                return InvalidPasswordResponse()
            }

            //check if email is a e-mail name@domain.com
            const emailIsValid = checkIfEmaailIsValid(params.email)
            if (!emailIsValid) {
                return EmailAlreadyInUseResponse()
            }

            // call use case

            const createUserUseCase = new CreateUserUseCase()

            const createdUser = await createUserUseCase.execute(params)

            //return status code
            return created(createdUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUserError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
