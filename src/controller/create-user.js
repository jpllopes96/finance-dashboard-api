import { CreateUserUseCase } from '../use-cases/create-user.js'
import validator from 'validator'
import { badRequest, created, serverError } from './helpers.js'

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
            if (params.password.length < 6) {
                return badRequest({
                    message: `Password must be at least 6 characters`,
                })
            }

            //check if email is a e-mail name@domain.com
            const emailIsValid = validator.isEmail(params.email)
            if (!emailIsValid) {
                return badRequest({
                    message: `Invalid e-mail. Please provide a valid one.`,
                })
            }
            // TODOcheck if the email is unique

            // call use case

            const createUserUseCase = new CreateUserUseCase()

            const createdUser = await createUserUseCase.execute(params)

            //return status code
            return created(createdUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
