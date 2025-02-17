import { EmailAlreadyInUserError } from '../../errors/users.js'
import { badRequest, created, serverError } from '../helpers/index.js'
import { createUserSchema } from '../../schemas/index.js'
import { ZodError } from 'zod'

export class CreateUserControler {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createUserSchema.parseAsync(params)

            // call use case

            const createdUser = await this.createUserUseCase.execute(params)

            //return status code
            return created(createdUser)
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
