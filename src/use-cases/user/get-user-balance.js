import { UserNotFoundError } from '../../errors/users.js'

export class GetUserBalanceUseCase {
    constructor(getUserBalanceRepository, getUserByIdRepository) {
        this.getUserBalanceRepository = getUserBalanceRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(params) {
        console.log(params.userId)

        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            throw new UserNotFoundError()
        }

        const balance = await this.getUserBalanceRepository.execute(
            params.userId,
        )

        return balance
    }
}
