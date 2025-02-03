import { PostgresDeleteUserRepository } from '../repositories/postgres/delete-user.js'

export class DeleteUserUseCase {
    async execute(userId) {
        const postgresDeleteUser = new PostgresDeleteUserRepository()

        const deletedUser = await postgresDeleteUser.execute(userId)

        return deletedUser
    }
}
