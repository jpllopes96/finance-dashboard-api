import { CreateUserController } from './create-user.js'
import { EmailAlreadyInUserError } from '../../errors/users.js'
import { faker } from '@faker-js/faker'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        async execute(user) {
            return user
        }
    }

    const makeSut = () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const sut = new CreateUserController(createUserUseCase)

        return { createUserUseCase, sut }
    }

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

    it('should return 201 when an user is successfully created', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(201)
        expect(result.body).toEqual(httpRequest.body)
    })

    it('should return 400 if first_name is not provided', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                first_name: undefined,
            },
        })

        //accert

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if last_name is not provided', async () => {
        const { sut } = makeSut()

        //act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                last_name: undefined,
            },
        })

        //accert

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is not provided', async () => {
        const { sut } = makeSut()

        //act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                email: undefined,
            },
        })

        //accert

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is invalid', async () => {
        const { sut } = makeSut()

        //act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                email: 'invalidEmail',
            },
        })

        //accert

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if password is not provided', async () => {
        const { sut } = makeSut()

        //act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                password: undefined,
            },
        })

        //accert

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if passwrod is less than 6 characters', async () => {
        const { sut } = makeSut()
        //act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                password: faker.internet.password({
                    length: 5,
                }),
            },
        })

        //accert

        expect(result.statusCode).toBe(400)
    })

    it('should call the CreateUserUseCase with correct params', async () => {
        const { sut, createUserUseCase } = makeSut()

        const executeSpy = import.meta.jest.spyOn(createUserUseCase, 'execute')

        await sut.execute(httpRequest)

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
        expect(executeSpy).toHaveBeenCalledTimes(1)
    })

    it('should return 500 if CreateUserUseCase Throws', async () => {
        // arrange
        const { sut, createUserUseCase } = makeSut()

        //act
        import.meta.jest
            .spyOn(createUserUseCase, 'execute')
            .mockRejectedValue(new Error())

        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(500)
    })

    it('should return 500 if CreateUserUseCase Throws EmailIsAlreadyInUse error', async () => {
        // arrange
        const { sut, createUserUseCase } = makeSut()

        //act
        import.meta.jest
            .spyOn(createUserUseCase, 'execute')
            .mockRejectedValueOnce(new EmailAlreadyInUserError())

        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(400)
    })
})
