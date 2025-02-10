import { UserNotFoundError } from '../../errors/users.js'

export class GetTransactionByUserIdUseCase {
    constructor(getTransactionsByUserIdRepository, getUserByIdRespository) {
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository
        this.getUserByIdRespository = getUserByIdRespository
    }

    async execute(params) {
        const user = await this.getUserByIdRespository.execute(params.userId)

        if (!user) {
            throw new UserNotFoundError(params.userId)
        }

        const transaction =
            await this.getTransactionsByUserIdRepository.execute(params.userId)

        return transaction
    }
}
