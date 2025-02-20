import { CreateUserController } from './create-user.js'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    it('should return 201 when an user is successfully created', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        //arrange
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Joao',
                last_name: 'Lopes',
                email: 'joao@email.com',
                password: '123456',
            },
        }

        //act

        const result = await createUserController.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(201)
        expect(result.body).toBe(httpRequest.body)
    })
})
