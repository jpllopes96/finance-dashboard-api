import { CreateUserController } from './create-user.js'
import { faker } from '@faker-js/faker'

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
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            },
        }

        //act

        const result = await createUserController.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(201)
        expect(result.body).toEqual(httpRequest.body)
    })

    it('should return 400 if first_name is not provided', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
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
                first_name: faker.person.firstName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
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
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                password: faker.internet.password({
                    length: 7,
                }),
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
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: 'invalid_email',
                password: faker.internet.password({
                    length: 7,
                }),
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
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
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
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 3,
                }),
            },
        }

        //act
        const result = await createUserController.execute(httpRequest)

        //accert

        expect(result.statusCode).toBe(400)
    })

    it('should call the CreateUserUseCase with correct params', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            },
        }

        const executeSpy = jest.spyOn(createUserUseCase, 'execute')

        await createUserController.execute(httpRequest)

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
        expect(executeSpy).toHaveBeenCalledTimes(1)
    })
})
