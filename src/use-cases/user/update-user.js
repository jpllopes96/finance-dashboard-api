import { EmailAlreadyInUserError } from '../../errors/users.js'
import bcrypt from 'bcrypt'

export class UpdateUserUseCase {
    constructor(getUserByEmailRepository, updateUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository
        this.updateUserRepository = updateUserRepository
    }

    async execute(userId, updateUserParam) {
        //If you are updating email, check if email is in use

        if (updateUserParam.email) {
            const userWithProvidadedEmail =
                await this.getUserByEmailRepository.execute(
                    updateUserParam.email,
                )

            if (
                userWithProvidadedEmail &&
                userWithProvidadedEmail.id != userId
            ) {
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

        const updatedUser = await this.updateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
