import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { EmailAlreadyInUserError } from '../errors/users.js'
import bcrypt from 'bcrypt'
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js'

export class UpdateUserUseCase {
    async execute(userId, updateUserParam) {
        //If you are updating email, check if email is in use

        if (updateUserParam.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository()

            const userWithProvidadedEmail =
                await postgresGetUserByEmailRepository.execute(
                    updateUserParam.email,
                )

            if (userWithProvidadedEmail) {
                throw new EmailAlreadyInUserError(updateUserParam.email)
            }
        }

        const user = {
            ...updateUserParam,
        }

        // if changing password, crypt
        if (updateUserParam.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParam.password,
                10,
            )
            user.password = hashedPassword
        }

        // call repository
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository()
        const updatedUser = await postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
