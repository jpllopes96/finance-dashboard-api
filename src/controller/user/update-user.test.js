import { faker } from '@faker-js/faker'
import { UpdateUserController } from './update-user.js'

describe('UpdateUserController', () => {
    class UpdateUserUseCaseStub {
        async execute(user) {
            return user
        }
    }
    const makeSut = () => {
        const updateUserUseCase = new UpdateUserUseCaseStub()
        const sut = new UpdateUserController(updateUserUseCase)

        return { sut, updateUserUseCase }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        },
    }

    it('should return 200 when updating an user successfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(200)
    })

    it('should return 400 when unallowed fiels is sent in the body', async () => {
        const { sut } = makeSut()

        const response = await sut.execute({
            params: httpRequest.params,
            body: {
                ...httpRequest.body,
                unallowed_filed: 'unallowed',
            },
        })

        expect(response.statusCode).toBe(400)
    })
})
