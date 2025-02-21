import { faker } from '@faker-js/faker'
import { GetUserByIdController } from './get-user-by-id.js'
describe('GetUserByIdController', () => {
    class GetUseByIdUseCaseStub {
        async execute() {
            return {
                id: faker.string.uuid(),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            }
        }
    }

    const makeSut = () => {
        const getUserByIdUseCase = new GetUseByIdUseCaseStub()
        const sut = new GetUserByIdController(getUserByIdUseCase)

        return { sut, getUserByIdUseCase }
    }

    it('should return 200 if a user is found', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: {
                userId: faker.string.uuid(),
            },
        })

        expect(result.statusCode).toBe(200)
    })

    it('should return 400 when InvalidId is recieved', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: {
                userId: 'InvalidId',
            },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 404 if user not found', async () => {
        const { sut, getUserByIdUseCase } = makeSut()

        jest.spyOn(getUserByIdUseCase, 'execute').mockResolvedValue(null)

        const result = await sut.execute({
            params: {
                userId: faker.string.uuid(),
            },
        })

        expect(result.statusCode).toBe(404)
    })
})
