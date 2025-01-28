import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { EmailAlreadyInUserError } from '../errors/users.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        //check if the email is already in use
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()

        const userWithProvidadedEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            )

        if (userWithProvidadedEmail) {
            throw new EmailAlreadyInUserError(createUserParams.email)
        }

        //generate UUID for user
        const userId = uuidv4()

        // crypt the password
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        //insert the user on DB
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        //call repository
        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createdUser = postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
