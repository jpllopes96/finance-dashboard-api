import { CreateUserUseCase } from '../use-cases/create-user.js'

export class CreateUserControler {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            //validate the request(not null fields, lenght, email)
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length == 0) {
                    return {
                        statusCode: 400,
                        body: {
                            errorMessage: `the field : ${field} is required`,
                        },
                    }
                }
            }

            // call use case

            const createUserUseCase = new CreateUserUseCase()

            const createdUser = await createUserUseCase.execute(params)

            //return status code
            return {
                statusCode: 201,
                body: createdUser,
            }
        } catch (error) {
            console.error(error)
            return {
                statusCode: 500,
                body: {
                    errorMessage: 'Internal server error',
                },
            }
        }
    }
}
