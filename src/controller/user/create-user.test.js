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

    it('should return 400 if first_name is not provided', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                last_name: 'Lopes',
                email: 'joao@email.com',
                password: '123456',
            },
        }

        //act
        const result = await createUserController.execute(httpRequest)

        //accert

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if last_name is not provided', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                first_name: 'Joao',
                email: 'joao@email.com',
                password: '123456',
            },
        }

        //act
        const result = await createUserController.execute(httpRequest)

        //accert

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is not provided', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                first_name: 'Joao',
                last_name: 'Lopes',
                password: '123456',
            },
        }

        //act
        const result = await createUserController.execute(httpRequest)

        //accert

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is invalid', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                first_name: 'Joao',
                last_name: 'Lopes',
                email: 'email@nodomain',
                password: '123456',
            },
        }

        //act
        const result = await createUserController.execute(httpRequest)

        //accert

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if password is not provided', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                first_name: 'Joao',
                last_name: 'Lopes',
                email: 'joao@email.com',
                password: '123',
            },
        }

        //act
        const result = await createUserController.execute(httpRequest)

        //accert

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if passwrod is less than 6 characters', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                first_name: 'Joao',
                last_name: 'Lopes',
                password: '123456',
            },
        }

        //act
        const result = await createUserController.execute(httpRequest)

        //accert

        expect(result.statusCode).toBe(400)
    })
})
