import { userNotFoundResponse } from '../../controller/helpers.js'

export class GetTransactionByUserIdUseCase {
    constructor(getTransactionsByUserIdRepository, getUserByIdRespository) {
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository
        this.getUserByIdRespository = getUserByIdRespository
    }

    async execute(params) {
        const user = await this.getUserByIdRespository.execute(params.userId)

        if (!user) {
            return userNotFoundResponse()
        }

        const transaction =
            await this.getTransactionsByUserIdRepository.execute(params.userId)

        return transaction
    }
}
