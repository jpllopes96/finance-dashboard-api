import { ForbiddenError } from '../../errors/users.js'

export class UpdateTrasactionUseCase {
    constructor(updateTransactionRepository, getTransactionByIdRepository) {
        this.updateTransactionRepository = updateTransactionRepository
        this.getTransactionByIdRepository = getTransactionByIdRepository
    }

    async execute(transactionId, params) {
        const transaction =
            await this.getTransactionByIdRepository.execute(transactionId)
        if (transaction.user_id != params.user_id) {
            throw new ForbiddenError()
        }
        return await this.updateTransactionRepository.execute(
            transactionId,
            params,
        )
    }
}
