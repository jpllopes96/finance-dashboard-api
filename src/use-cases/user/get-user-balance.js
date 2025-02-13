import { UserNotFoundError } from '../../errors/users.js'

export class getUserBalanaceUseCase {
    constructor(getUserBalanceRepository, getUserByIdRepository) {
        ;(this.getUserBalanceRepository = getUserBalanceRepository),
            (this.getUserByIdRepository = getUserByIdRepository)
    }

    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.id)

        if (!user) {
            throw new UserNotFoundError()
        }

        const balance = await this.getUserBalanceRepository.execute(
            params.userId,
        )

        return balance
    }
}
