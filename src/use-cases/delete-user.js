import { PostgresDeleteUser } from '../repositories/postgres/delete-user.js'

export class DeleteUserUseCase {
    async execute(userId) {
        const postgresDeleteUser = new PostgresDeleteUser()

        const deletedUser = await postgresDeleteUser.execute(userId)

        return deletedUser
    }
}
